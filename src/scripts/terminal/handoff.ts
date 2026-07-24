// One-shot command handoff between pages: the 404 prompt stashes whatever
// the visitor typed, the homepage shell runs it after boot. sessionStorage
// keeps it tab-local and survives exactly one navigation.

const KEY = "pending-command";

export const stashCommand = (cmd: string) => {
  try {
    sessionStorage.setItem(KEY, cmd);
  } catch {
    /* strict privacy mode — the visitor just lands on a fresh prompt */
  }
};

export const consumeCommand = (): string | null => {
  try {
    const cmd = sessionStorage.getItem(KEY);
    if (cmd) sessionStorage.removeItem(KEY);
    return cmd;
  } catch {
    return null;
  }
};
