import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTerminal, type TerminalElements } from "./boot";
import { THEMES } from "../../lib/themes";

// jsdom ships no matchMedia; reduced motion also skips the typing animation,
// which keeps these tests synchronous.
vi.stubGlobal("matchMedia", (query: string) => ({
  matches: query.includes("reduce") || query.includes("hover"),
}));

const DATA = {
  lastLabel: "Sun Dec 29 2013",
  lastIso: "2013-12-29T00:00:00.000Z",
  newCount: 0,
  archivedCount: 231,
};

function mount() {
  const el = <T extends HTMLElement>(tag: string) =>
    document.createElement(tag) as T;

  const input = el<HTMLInputElement>("input");
  input.disabled = true;
  const form = el<HTMLFormElement>("form");
  form.append(input);

  const screen = el("div");
  const output = el("div");
  screen.append(output, form);

  const window = el("div");
  const vimRoot = el("div");
  vimRoot.hidden = true;
  const vimBuffer = el<HTMLPreElement>("pre");
  const vimStatus = el("div");
  vimRoot.append(vimBuffer, vimStatus);
  window.append(screen, vimRoot);

  const ttyRoot = el("div");
  ttyRoot.hidden = true;
  const ttyInput = el<HTMLInputElement>("input");
  const ttyForm = el<HTMLFormElement>("form");
  ttyForm.append(ttyInput);
  const ttyLog = el("div");
  const ttyLabel = el("label");
  ttyRoot.append(ttyLog, ttyLabel, ttyForm);

  const els: TerminalElements = {
    window,
    screen,
    output,
    input,
    form,
    themeName: el("span"),
    themeButton: el("button"),
    closeButton: el("button"),
    vim: { root: vimRoot, buffer: vimBuffer, status: vimStatus },
    tty: {
      root: ttyRoot,
      log: ttyLog,
      label: ttyLabel,
      input: ttyInput,
      form: ttyForm,
    },
  };
  document.body.replaceChildren(
    window,
    ttyRoot,
    els.themeButton,
    els.closeButton,
  );
  return { els, terminal: createTerminal(els, DATA) };
}

const press = (target: EventTarget, key: string, ctrlKey = false) =>
  target.dispatchEvent(
    new KeyboardEvent("keydown", { key, ctrlKey, bubbles: true }),
  );

describe("createTerminal", () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.documentElement.dataset.theme = THEMES[0];
  });

  it("boots with the login banner, then hands over a live prompt", async () => {
    const { els, terminal } = mount();
    await terminal.boot();

    const text = els.output.textContent ?? "";
    expect(text).toContain("Last login: Sun Dec 29 2013");
    expect(text).toContain("You have 0 new posts");
    expect(text).toContain("231 archived");
    // the two boot commands ran and printed their output
    expect(text).toContain("software engineer");
    expect(text).toContain("about.md");
    expect(els.input.disabled).toBe(false);
    // announced only after the animation, so the boot isn't re-read aloud
    expect(els.output.getAttribute("aria-live")).toBe("polite");
  });

  it("runs a command forwarded from the 404 page exactly once", async () => {
    sessionStorage.setItem("pending-command", "pwd");
    const { els, terminal } = mount();
    await terminal.boot();
    expect(els.output.textContent).toContain("/home/emrah");
    expect(sessionStorage.getItem("pending-command")).toBeNull();
  });

  it("submits the prompt and clears the input", async () => {
    const { els, terminal } = mount();
    await terminal.boot();
    els.input.value = "pwd";
    els.form.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(els.output.textContent).toContain("/home/emrah");
    expect(els.input.value).toBe("");
  });

  it("binds history, tab completion and ctrl+l to the prompt", async () => {
    const { els, terminal } = mount();
    await terminal.boot();

    els.input.value = "pwd";
    els.form.dispatchEvent(new Event("submit", { cancelable: true }));
    press(els.input, "ArrowUp");
    expect(els.input.value).toBe("pwd");
    press(els.input, "ArrowDown");
    expect(els.input.value).toBe("");

    els.input.value = "who";
    press(els.input, "Tab");
    expect(els.input.value).toBe("whoami");

    press(els.input, "l", true);
    expect(els.output.textContent).toBe("");
  });

  // the block caret is drawn after the input, so a stale width strands it
  it("keeps the input as wide as its content", async () => {
    const { els, terminal } = mount();
    await terminal.boot();
    const cols = () => els.input.style.getPropertyValue("--cols");

    els.input.value = "pwd";
    els.input.dispatchEvent(new Event("input", { bubbles: true }));
    expect(cols()).toBe("3");

    els.form.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(cols()).toBe("0");

    press(els.input, "ArrowUp"); // history sets the value with no input event
    expect(cols()).toBe("3");
  });

  // iOS opens its keyboard by shrinking the visual viewport and scrolling the
  // page out from under the window, rather than by resizing anything
  it("fits the window to the visual viewport, pinch-zoom excepted", async () => {
    const vv = Object.assign(new EventTarget(), { height: 420, scale: 1 });
    Object.defineProperty(window, "visualViewport", {
      value: vv,
      configurable: true,
    });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const height = () =>
      document.documentElement.style.getPropertyValue("--vv");

    const { terminal } = mount();
    await terminal.boot();

    vv.dispatchEvent(new Event("resize"));
    expect(height()).toBe("420px");
    expect(scrollTo).toHaveBeenCalledWith(0, 0);

    // Safari finishes its own scroll after the resize, so scroll is pinned too
    vv.height = 300;
    vv.dispatchEvent(new Event("scroll"));
    expect(height()).toBe("300px");

    Object.assign(vv, { scale: 2, height: 100 });
    vv.dispatchEvent(new Event("resize"));
    expect(height()).toBe("300px");

    scrollTo.mockRestore();
    Reflect.deleteProperty(window, "visualViewport");
    document.documentElement.style.removeProperty("--vv");
  });

  it("runs data-cmd links instead of following them", async () => {
    const { els, terminal } = mount();
    await terminal.boot();
    const link = document.createElement("a");
    link.href = "#";
    link.dataset.cmd = "pwd";
    els.output.append(link);

    const click = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);
    expect(els.output.textContent).toContain("/home/emrah");
  });

  it("cycles the colorscheme from the status-bar button", async () => {
    const { els, terminal } = mount();
    await terminal.boot();
    els.themeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(document.documentElement.dataset.theme).toBe(THEMES[1]);
    expect(els.themeName.textContent).toBe(THEMES[1]);
  });

  it("closing the window drops to the virtual console", async () => {
    const { els, terminal } = mount();
    await terminal.boot();
    els.closeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(els.tty.root.hidden).toBe(false);
    expect(els.window.hidden).toBe(true);
  });

  it("closing mid-vim disarms the trap instead of leaving it armed", async () => {
    const { els, terminal } = mount();
    await terminal.boot();
    els.input.value = "vim";
    els.form.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(els.vim.root.hidden).toBe(false);

    els.closeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(els.vim.root.hidden).toBe(true);
    // keystrokes now belong to the console, not the abandoned editor
    press(document, "x");
    expect(els.vim.buffer.textContent).not.toContain("x");
  });

  it("prints a fallback for sl when motion is reduced", async () => {
    const { els, terminal } = mount();
    await terminal.boot();
    els.input.value = "sl";
    els.form.dispatchEvent(new Event("submit", { cancelable: true }));
    expect(els.output.textContent).toContain("imagine a steam locomotive");
  });
});
