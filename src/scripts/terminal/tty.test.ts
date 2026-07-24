import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTtyConsole, type TtyConsoleOptions } from "./tty";

const makeConsole = () => {
  const root = document.createElement("div");
  root.hidden = true;
  const win = document.createElement("div");
  const log = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const form = document.createElement("form");
  form.append(input);
  root.append(log, label, form);
  document.body.replaceChildren(root, win);

  const onRestore = vi.fn();
  const opts: TtyConsoleOptions = {
    root,
    window: win,
    log,
    label,
    input,
    form,
    onRestore,
  };
  return { ...opts, onRestore, console: createTtyConsole(opts) };
};

const submit = (form: HTMLFormElement) =>
  form.dispatchEvent(new Event("submit", { cancelable: true }));

describe("createTtyConsole", () => {
  let c: ReturnType<typeof makeConsole>;

  beforeEach(() => {
    c = makeConsole();
  });

  it("starts closed and opens over the window on drop", () => {
    expect(c.console.isOpen()).toBe(false);
    c.console.drop();
    expect(c.console.isOpen()).toBe(true);
    expect(c.window.hidden).toBe(true);
    expect(c.label.textContent).toBe("web login:");
    expect(document.activeElement).toBe(c.input);
  });

  it("walks login → password → restored session", () => {
    c.console.drop();
    c.input.value = "root";
    submit(c.form);
    expect(c.log.textContent).toContain("web login: root");
    expect(c.label.textContent).toBe("Password:");
    expect(c.input.type).toBe("password");
    expect(c.input.value).toBe("");
    expect(c.onRestore).not.toHaveBeenCalled();

    submit(c.form); // any password works — it's a joke, not a gate
    expect(c.console.isOpen()).toBe(false);
    expect(c.window.hidden).toBe(false);
    expect(c.onRestore).toHaveBeenCalledOnce();
  });

  it("falls back to the site's own user when nothing is typed", () => {
    c.console.drop();
    c.input.value = "   ";
    submit(c.form);
    expect(c.log.textContent).toContain("web login: emrahyumuk");
  });

  it("escapes straight back to the session", () => {
    c.console.drop();
    c.root.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(c.console.isOpen()).toBe(false);
    expect(c.onRestore).toHaveBeenCalledOnce();
  });

  it("resets the login stage when dropped a second time", () => {
    c.console.drop();
    submit(c.form); // now at the password stage
    c.console.drop();
    expect(c.label.textContent).toBe("web login:");
    expect(c.input.type).toBe("text");
    expect(c.log.textContent).toBe("");
  });
});
