// The command interpreter: parsing, dispatch, history and completion.
// It owns no DOM beyond what the host hands it through `deps`, which keeps
// the whole table testable and Terminal.astro down to wiring.
import { THEMES, currentTheme, isTheme } from "../../lib/themes";
import { UI, ROUTES, FILE_ROUTES, neofetchArt } from "./content";

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export interface ShellDeps {
  /** append one output line; returns the element for further mutation */
  print: (html: string, cls?: string) => HTMLElement;
  /** echo the prompt + entered command before dispatch */
  echo: (cmd: string) => void;
  clearScreen: () => void;
  navigate: (path: string) => void;
  setTheme: (name: string) => void;
  /** days since the last post, for the ping joke */
  daysAgo: number;
  /** size of the closed 2008-2013 corpus, quoted by help/history */
  archivedCount: number;
  onVim: () => void;
  onTrain: () => void;
  onExitSession: () => void;
}

export function createShell(deps: ShellDeps) {
  const {
    print,
    echo,
    clearScreen,
    navigate,
    setTheme,
    daysAgo,
    archivedCount,
    onVim,
    onTrain,
    onExitSession,
  } = deps;

  const commands: Record<string, (rest?: string[]) => void> = {
    help: () => UI.help(archivedCount).forEach((l) => print(l)),
    whoami: () => UI.whoami.forEach((l) => print(l)),
    ls: () =>
      print(
        `<a href="${ROUTES.blog}" class="dir">blog/</a>  <a href="${ROUTES.about}">about.md</a>  <a href="#" data-cmd="contact">contact.md</a>`,
      ),
    history: () => UI.history(archivedCount).forEach((l) => print(l)),
    blog: () => navigate(ROUTES.blog),
    about: () => navigate(ROUTES.about),
    contact: () => UI.contact.forEach((l) => print(l)),
    theme: (rest) => {
      const pick = rest?.[0];
      if (!pick) {
        print(`current: <b>${currentTheme()}</b>`);
        print(
          `available: ${THEMES.map((t) => `<a href="#" data-cmd="theme ${t}">${t}</a>`).join("  ")}`,
          "dim",
        );
      } else if (isTheme(pick)) {
        setTheme(pick);
      } else {
        print(
          `theme: ${escapeHtml(pick)}: unknown scheme. plain '<b>theme</b>' lists them.`,
        );
      }
    },
    clear: clearScreen,
    pwd: () => print("/home/emrah"),
    sudo: (rest) => {
      const arg = rest?.join(" ") ?? "";
      if (!arg) {
        print(UI.sudoLecture);
      } else if (arg === "make me a sandwich") {
        print("okay."); // xkcd 149
      } else {
        print("[sudo] password for emrah: ");
        print(UI.sudoDenied);
      }
    },
    exit: onExitSession,
    logout: onExitSession,
    vim: onVim,
    vi: onVim,
    nano: () => print(UI.nano),
    rm: () => print(UI.rm),
    ping: (rest) => {
      const target = escapeHtml(rest?.[0] ?? "emrahyumuk.com");
      print(`PING ${target} 56(84) bytes of data.`);
      if (rest?.[0]) {
        const fakeMs = 100 + (Date.now() % 900);
        print(`64 bytes from ${target}: icmp_seq=1 ttl=57 time=0.${fakeMs} ms`);
      } else {
        print(
          `64 bytes from emrahyumuk.com: icmp_seq=1 ttl=57 time=${daysAgo.toLocaleString("en")} days <span class="dim">(you know why)</span>`,
        );
      }
    },
    sl: onTrain,
    // 44 columns wide: too wide for a phone at the screen's own size
    neofetch: () => neofetchArt(currentTheme()).forEach((l) => print(l, "art")),
  };

  const history: string[] = [];
  let historyIndex = 0;

  const run = (raw: string) => {
    const cmd = raw.trim();
    echo(cmd);
    if (!cmd) return;
    history.push(cmd);
    historyIndex = history.length;

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
    if (head === "cat" && rest[0]) {
      const target = FILE_ROUTES[rest[0]];
      if (target) return navigate(target);
      if (rest[0] === "contact.md") return commands.contact();
      return print(`cat: ${escapeHtml(rest[0])}: No such file`);
    }
    if (head === "cd") {
      if (!rest[0] || rest[0] === "~") return; // already home — cd says nothing
      const target = FILE_ROUTES[rest[0]];
      if (target) return navigate(target);
      return print(`cd: ${escapeHtml(rest[0])}: No such directory`);
    }
    const command = commands[head];
    if (command) {
      command(rest);
    } else {
      print(UI.notFound(escapeHtml(head)));
    }
  };

  return {
    commands,
    run,
    complete: (partial: string): string | null =>
      [...Object.keys(commands), "cat "].find(
        (c) => c.startsWith(partial) && c !== partial,
      ) ?? null,
    historyPrev: (): string | null =>
      historyIndex > 0 ? history[--historyIndex] : null,
    historyNext: (): string | null => {
      if (historyIndex < history.length - 1) return history[++historyIndex];
      historyIndex = history.length;
      return null;
    },
  };
}
