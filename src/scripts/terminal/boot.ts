// Wires the terminal together: output plane, boot sequence, key bindings and
// the two escape hatches (fake vim, virtual console). Terminal.astro resolves
// the elements and hands them over, so everything below is testable in jsdom.
import { applyTheme, currentTheme, nextTheme } from "../../lib/themes";
import { DAY_MS, TIMING, ROUTES, PS1, UI, TRAIN_ART } from "./content";
import { createShell, escapeHtml } from "./shell";
import { createVimTrap } from "./vim";
import { createTtyConsole } from "./tty";
import { consumeCommand } from "./handoff";

export interface TerminalElements {
  /** the emulator window; the locomotive rides across it */
  window: HTMLElement;
  /** the scrolling screen area */
  screen: HTMLElement;
  /** where output lines are appended */
  output: HTMLElement;
  input: HTMLInputElement;
  form: HTMLFormElement;
  themeName: HTMLElement;
  themeButton: HTMLElement;
  closeButton: HTMLElement;
  vim: { root: HTMLElement; buffer: HTMLPreElement; status: HTMLElement };
  tty: {
    root: HTMLElement;
    log: HTMLElement;
    label: HTMLElement;
    input: HTMLInputElement;
    form: HTMLFormElement;
  };
}

/** build-time facts the login banner quotes */
export interface TerminalData {
  /** the latest post's date, already formatted */
  lastLabel: string;
  lastIso: string;
  newCount: number;
  archivedCount: number;
}

export function createTerminal(els: TerminalElements, data: TerminalData) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------- output plane
  const line = (html: string, cls = "") => {
    const el = document.createElement("div");
    el.className = `tline ${cls}`;
    el.innerHTML = html;
    els.output.appendChild(el);
    return el;
  };
  // the window's screen scrolls internally, like a real emulator
  const scrollEnd = () => (els.screen.scrollTop = els.screen.scrollHeight);
  const focusPrompt = () => els.input.focus({ preventScroll: true });

  const navigate = (path: string) => {
    line(UI.opening(path), "dim");
    setTimeout(() => (location.href = path), TIMING.navigate);
  };

  // ---------------------------------------------------------- login banner
  // last activity = latest post (build-time data); the day count stays live
  const daysAgo = Math.floor(
    (Date.now() - new Date(data.lastIso).getTime()) / DAY_MS,
  );

  // --------------------------------------------------------------- theming
  const setTheme = (name: string) => {
    applyTheme(name);
    els.themeName.textContent = name;
  };
  els.themeName.textContent = currentTheme();

  // ----------------------------------------------------------- easter eggs
  const vimTrap = createVimTrap({
    ...els.vim,
    host: els.screen,
    onExit: () => {
      line(UI.vimExited, "dim");
      scrollEnd();
      focusPrompt();
    },
  });

  /** sl: the typo's punishment — a steam locomotive crossing the window */
  const runTrain = () => {
    if (reducedMotion) {
      line(UI.trainFallback, "dim");
      return;
    }
    const train = document.createElement("pre");
    train.className = "sl-train";
    train.textContent = TRAIN_ART;
    els.window.appendChild(train);
    const distance = els.window.clientWidth + train.clientWidth + 80;
    const ride = train.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${distance}px)` },
      ],
      { duration: TIMING.train, easing: "linear" },
    );
    ride.onfinish = () => train.remove();
  };

  const exitSession = () => {
    line("logout");
    setTimeout(dropToTty, TIMING.logout);
  };

  // ----------------------------------------------------------------- shell
  const shell = createShell({
    print: line,
    echo: (cmd) => line(PS1 + escapeHtml(cmd), "echo"),
    clearScreen: () => (els.output.innerHTML = ""),
    navigate,
    setTheme,
    daysAgo,
    archivedCount: data.archivedCount,
    onVim: () => vimTrap.open(),
    onTrain: runTrain,
    onExitSession: exitSession,
  });

  // -------------------------------------------------------- virtual console
  const ttyConsole = createTtyConsole({
    ...els.tty,
    window: els.window,
    onRestore: () => {
      line(UI.welcomeBack, "dim");
      scrollEnd();
      focusPrompt();
    },
  });

  function dropToTty() {
    vimTrap.forceClose(); // closing mid-trap must not leave its key handler armed
    ttyConsole.drop();
  }

  // ---------------------------------------------------------- prompt input
  // the input carries no box of its own — it is exactly as wide as what is
  // typed, so the block caret drawn after it sits where the next letter goes
  const sizeInput = () =>
    els.input.style.setProperty("--cols", String(els.input.value.length));
  els.input.addEventListener("input", sizeInput);

  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    shell.run(els.input.value);
    els.input.value = "";
    sizeInput();
    scrollEnd();
  });

  els.input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      els.input.value = shell.historyPrev() ?? els.input.value;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      els.input.value = shell.historyNext() ?? "";
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = els.input.value.toLowerCase();
      if (partial) els.input.value = shell.complete(partial) ?? els.input.value;
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      shell.commands.clear();
    }
    sizeInput(); // history and completion set the value without an input event
  });

  // iOS raises the keyboard by shrinking the visual viewport and scrolling the
  // page, which slides the window's titlebar off the top. Fit the window to
  // what is left of the screen instead, and take the scroll back.
  // Safari applies that scroll asynchronously, after the resize — so the page
  // has to be pinned on both events, not just the one that carries the height.
  const vv = window.visualViewport;
  if (vv) {
    const fitToViewport = () => {
      if (vv.scale > 1) return; // pinch-zoom shrinks it too, and must be left alone
      document.documentElement.style.setProperty("--vv", `${vv.height}px`);
      scrollTo(0, 0);
      scrollEnd(); // the shorter screen would otherwise keep the prompt below it
    };
    vv.addEventListener("resize", fitToViewport);
    vv.addEventListener("scroll", fitToViewport);
  }

  els.themeButton.addEventListener("click", () => setTheme(nextTheme()));
  els.closeButton.addEventListener("click", dropToTty);

  // click anywhere → focus the prompt (unless selecting text or clicking a link)
  document.addEventListener("click", (e) => {
    if (ttyConsole.isOpen()) {
      els.tty.input.focus({ preventScroll: true });
      return;
    }
    const target = e.target as HTMLElement;
    const link = target.closest("a");
    if (link?.dataset.cmd) {
      e.preventDefault();
      shell.run(link.dataset.cmd);
      scrollEnd();
      return;
    }
    if (!link && !getSelection()?.toString() && !target.closest("button")) {
      focusPrompt();
    }
  });

  // --------------------------------------------------------- boot sequence
  // type each command, print its output, then hand the prompt over.
  // any keypress fast-forwards; reduced motion skips the animation entirely.
  let skipTyping = reducedMotion;
  addEventListener("keydown", () => (skipTyping = true), { once: true });

  const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async function typeCommand(cmd: string) {
    const el = line(PS1, "echo");
    for (let i = 0; i < cmd.length && !skipTyping; i++) {
      el.innerHTML =
        PS1 + escapeHtml(cmd.slice(0, i + 1)) + `<span class="caret"></span>`;
      await pause(TIMING.typeBase + Math.random() * TIMING.typeJitter);
    }
    el.innerHTML = PS1 + escapeHtml(cmd);
  }

  async function boot() {
    const plural = data.newCount === 1 ? "" : "s";
    line(
      `Last login: ${data.lastLabel} (${daysAgo.toLocaleString("en")} days ago)`,
      "dim",
    );
    line(
      `You have ${data.newCount} new post${plural}, <a href="${ROUTES.archived}">${data.archivedCount} archived</a>.`,
      "dim",
    );
    for (const cmd of ["whoami", "ls"]) {
      if (!skipTyping) await pause(TIMING.bootPause);
      await typeCommand(cmd);
      shell.commands[cmd]();
      scrollEnd();
    }
    line("&nbsp;");
    line(UI.hint, "dim");
    // attached only now so screen readers don't re-announce the boot animation
    els.output.setAttribute("role", "log");
    els.output.setAttribute("aria-live", "polite");
    els.input.disabled = false;
    if (matchMedia("(hover: hover)").matches) focusPrompt();
    // a command typed on the 404 page lands here, on the real shell
    const forwarded = consumeCommand();
    if (forwarded) {
      shell.run(forwarded);
      scrollEnd();
    }
  }

  return { boot, shell };
}
