// The bare virtual console behind the GUI. Closing the window (or `exit`)
// drops here; a fake login — any credentials work — or Escape restores the
// session through the host's onRestore hook.

export interface TtyConsoleOptions {
  /** the console overlay root (also hosts the Escape listener) */
  root: HTMLElement;
  /** the terminal window hidden while the console is up */
  window: HTMLElement;
  log: HTMLElement;
  label: HTMLElement;
  input: HTMLInputElement;
  form: HTMLFormElement;
  /** called after a successful "login", for the shell's welcome-back line */
  onRestore: () => void;
}

export function createTtyConsole(opts: TtyConsoleOptions) {
  const { root, window: win, log, label, input, form, onRestore } = opts;
  let stage: "login" | "password" = "login";

  // like the shell prompt: the input is only as wide as what is typed, so the
  // block caret drawn after it sits where the next character goes
  const sizeInput = () =>
    input.style.setProperty("--cols", String(input.value.length));
  input.addEventListener("input", sizeInput);

  const drop = () => {
    win.hidden = true;
    root.hidden = false;
    log.innerHTML = "";
    stage = "login";
    label.textContent = "web login:";
    input.type = "text";
    input.value = "";
    sizeInput();
    input.focus();
  };

  const restore = () => {
    root.hidden = true;
    win.hidden = false;
    onRestore();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (stage === "password") return restore();
    const user = input.value.trim() || "emrahyumuk";
    const echo = document.createElement("div");
    echo.textContent = `web login: ${user}`;
    log.appendChild(echo);
    stage = "password";
    label.textContent = "Password:";
    input.type = "password";
    input.value = "";
    sizeInput();
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") restore();
  });

  return { drop, isOpen: () => !root.hidden };
}
