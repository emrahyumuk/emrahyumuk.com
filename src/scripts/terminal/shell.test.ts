import { beforeEach, describe, expect, it, vi } from "vitest";
import { createShell, escapeHtml, type ShellDeps } from "./shell";

const makeDeps = () => {
  const printed: string[] = [];
  const deps = {
    print: vi.fn((html: string) => {
      printed.push(html);
      return document.createElement("div");
    }),
    echo: vi.fn(),
    clearScreen: vi.fn(),
    navigate: vi.fn(),
    setTheme: vi.fn(),
    daysAgo: 4599,
    archivedCount: 231,
    onVim: vi.fn(),
    onTrain: vi.fn(),
    onExitSession: vi.fn(),
  } satisfies ShellDeps;
  return { deps, printed };
};

describe("createShell", () => {
  let deps: ReturnType<typeof makeDeps>["deps"];
  let printed: string[];
  let shell: ReturnType<typeof createShell>;

  beforeEach(() => {
    ({ deps, printed } = makeDeps());
    shell = createShell(deps);
  });

  it("echoes every entry, even an empty one", () => {
    shell.run("   ");
    expect(deps.echo).toHaveBeenCalledWith("");
    expect(printed).toHaveLength(0);
  });

  it("reports unknown commands with a help hint", () => {
    shell.run("frobnicate");
    expect(printed[0]).toContain("command not found");
    expect(printed[0]).toContain("help");
  });

  it("navigates for blog/about and for cat/cd on known files", () => {
    shell.run("blog");
    shell.run("cat about.md");
    shell.run("cd blog");
    expect(deps.navigate.mock.calls.map((c) => c[0])).toEqual([
      "/blog/",
      "/about/",
      "/blog/",
    ]);
  });

  it("treats bare cd and cd ~ as a silent no-op", () => {
    shell.run("cd");
    shell.run("cd ~");
    expect(deps.navigate).not.toHaveBeenCalled();
    expect(printed).toHaveLength(0);
  });

  it("errors on cat/cd targets that do not exist", () => {
    shell.run("cat nope.txt");
    shell.run("cd nope");
    expect(printed[0]).toContain("No such file");
    expect(printed[1]).toContain("No such directory");
  });

  it("lists themes without an argument and applies a valid pick", () => {
    shell.run("theme");
    expect(printed.some((l) => l.includes("available"))).toBe(true);
    shell.run("theme gruvbox");
    expect(deps.setTheme).toHaveBeenCalledWith("gruvbox");
    shell.run("theme neon-kebab");
    expect(printed.at(-1)).toContain("unknown scheme");
  });

  it("delegates the interactive commands to their hooks", () => {
    shell.run("vim");
    shell.run("sl");
    shell.run("exit");
    shell.run("clear");
    expect(deps.onVim).toHaveBeenCalledOnce();
    expect(deps.onTrain).toHaveBeenCalledOnce();
    expect(deps.onExitSession).toHaveBeenCalledOnce();
    expect(deps.clearScreen).toHaveBeenCalledOnce();
  });

  it("quotes the injected archive size in help and history", () => {
    shell.run("help");
    expect(printed.some((l) => l.includes("231 archived"))).toBe(true);
    printed.length = 0;
    shell.run("history");
    expect(printed.some((l) => l.includes("231 posts"))).toBe(true);
  });

  it("answers a bare ping with the days-since-last-post joke", () => {
    shell.run("ping");
    expect(printed.at(-1)).toContain("4,599 days");
  });

  it("grants the xkcd sandwich and denies everything else under sudo", () => {
    shell.run("sudo make me a sandwich");
    expect(printed.at(-1)).toBe("okay.");
    shell.run("sudo rm -rf /");
    expect(printed.at(-1)).toContain("not in the sudoers file");
  });

  it("walks history with prev/next and clamps at both ends", () => {
    shell.run("whoami");
    shell.run("ls");
    expect(shell.historyPrev()).toBe("ls");
    expect(shell.historyPrev()).toBe("whoami");
    expect(shell.historyPrev()).toBeNull(); // clamped at the oldest entry
    expect(shell.historyNext()).toBe("ls");
    expect(shell.historyNext()).toBeNull(); // back past the newest → empty prompt
  });

  it("completes command prefixes and leaves full matches alone", () => {
    expect(shell.complete("he")).toBe("help");
    expect(shell.complete("help")).toBeNull();
    expect(shell.complete("zzz")).toBeNull();
  });
});

describe("escapeHtml", () => {
  it("neutralises markup so user input renders as text", () => {
    expect(escapeHtml(`<img src=x onerror=alert(1)> & "q"`)).toBe(
      `&lt;img src=x onerror=alert(1)&gt; &amp; "q"`,
    );
  });
});
