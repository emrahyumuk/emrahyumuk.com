// The fake-vim trap: a full-screen <pre> that swallows keystrokes until the
// visitor earns their freedom with :q! — twice. Owns its own state and the
// document-level key handler; the shell only calls open()/forceClose().

export interface VimTrapOptions {
  /** the editor surface: focused on open so keyboard users keep their place */
  root: HTMLElement;
  /** the <pre> the buffer and its tildes render into */
  buffer: HTMLPreElement;
  /** the bottom line — a live region, so the :q! way out gets announced */
  status: HTMLElement;
  /** the element hidden while the editor is up (the terminal screen) */
  host: HTMLElement;
  /** called after a successful :q! exit, for the shell's follow-up line */
  onExit: () => void;
}

const EMPTY_STATUS = '"[No Name]" 0L, 0B';
const ROWS = 17; // text + tildes filling a typical window height

export function createVimTrap(opts: VimTrapOptions) {
  const { root, buffer, status: statusEl, host, onExit } = opts;
  // open() focuses the root, so own that requirement here rather than trusting
  // the markup to carry a tabindex the module silently depends on
  root.tabIndex = -1;
  let active = false;
  let text = "";
  let command: string | null = null;
  let status = EMPTY_STATUS;
  let quitAttempts = 0;

  const render = () => {
    const lines = text ? text.split("\n") : [""];
    const tildes = Math.max(0, ROWS - 1 - lines.length);
    buffer.textContent = [...lines, ...Array(tildes).fill("~")].join("\n");
    statusEl.textContent = command ?? status;
  };

  const setVisible = (visible: boolean) => {
    active = visible;
    root.hidden = !visible;
    host.hidden = visible;
  };

  const open = () => {
    text = "";
    command = null;
    status = EMPTY_STATUS;
    quitAttempts = 0;
    setVisible(true);
    render();
    // the host just went hidden with focus inside it; take focus explicitly
    // so the editor is where the keyboard (and a screen reader) now is
    root.focus({ preventScroll: true });
  };

  /** silent teardown, for when the whole window closes around us */
  const forceClose = () => {
    if (active) setVisible(false);
  };

  const exit = () => {
    setVisible(false);
    onExit();
  };

  const evalCommand = (cmd: string) => {
    command = null;
    if (cmd === ":q" || cmd === ":wq" || cmd === ":x") {
      status = "E37: No write since last change (add ! to override)";
    } else if (cmd === ":w") {
      status = "E45: 'readonly' option is set (add ! to override)";
    } else if (cmd === ":help") {
      status = "you're beyond help. try :q!";
    } else if (cmd === ":q!") {
      if (++quitAttempts >= 2) return exit();
      status = "seriously? you just got here.";
    } else {
      status = `E492: Not an editor command: ${cmd.slice(1)}`;
    }
    render();
  };

  document.addEventListener("keydown", (e) => {
    if (!active) return;
    if (e.key === "c" && e.ctrlKey) {
      // what real vim prints on ctrl+c — and a genuine way out of the joke
      e.preventDefault();
      status = "Type  :q!  and press <Enter> to abandon all changes";
      command = null;
      render();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return; // let browser shortcuts through
    e.preventDefault();
    if (command !== null) {
      if (e.key === "Enter") return evalCommand(command);
      if (e.key === "Escape") command = null;
      else if (e.key === "Backspace") command = command.slice(0, -1) || null;
      else if (e.key.length === 1) command += e.key;
    } else {
      if (e.key === ":") command = ":";
      else if (e.key === "Enter") text += "\n";
      else if (e.key === "Backspace") text = text.slice(0, -1);
      else if (e.key.length === 1) {
        text += e.key;
        status = "-- INSERT --";
      }
    }
    render();
  });

  return { open, forceClose };
}
