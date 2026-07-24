import { beforeEach, describe, expect, it, vi } from "vitest";
import { createVimTrap } from "./vim";

const key = (k: string, opts: KeyboardEventInit = {}) =>
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: k, cancelable: true, ...opts }),
  );

const type = (chars: string) => [...chars].forEach((c) => key(c));

describe("createVimTrap", () => {
  let root: HTMLElement;
  let buffer: HTMLPreElement;
  let status: HTMLElement;
  let host: HTMLElement;
  let onExit: ReturnType<typeof vi.fn<() => void>>;
  let trap: ReturnType<typeof createVimTrap>;

  /** everything on screen, as a reader would perceive it */
  const shown = () => `${buffer.textContent}\n${status.textContent}`;

  beforeEach(() => {
    root = document.createElement("div");
    root.hidden = true;
    buffer = document.createElement("pre");
    status = document.createElement("div");
    root.append(buffer, status);
    document.body.append(root);
    host = document.createElement("div");
    onExit = vi.fn();
    trap = createVimTrap({ root, buffer, status, host, onExit });
  });

  it("opens over the host with tildes and an empty-buffer status", () => {
    trap.open();
    expect(root.hidden).toBe(false);
    expect(host.hidden).toBe(true);
    expect(buffer.textContent).toContain("~\n~");
    expect(status.textContent).toBe('"[No Name]" 0L, 0B');
    // the host went hidden with focus inside it; the trap must take it over
    expect(document.activeElement).toBe(root);
  });

  it("stays inert while closed", () => {
    type(":q!");
    key("Enter");
    expect(shown().trim()).toBe("");
    expect(onExit).not.toHaveBeenCalled();
  });

  it("refuses :q with E37 and :w with E45", () => {
    trap.open();
    type(":q");
    key("Enter");
    expect(status.textContent).toContain("E37");
    type(":w");
    key("Enter");
    expect(status.textContent).toContain("E45");
  });

  it("needs :q! twice: first mocks you, second frees you", () => {
    trap.open();
    type(":q!");
    key("Enter");
    expect(status.textContent).toContain("seriously?");
    expect(onExit).not.toHaveBeenCalled();
    type(":q!");
    key("Enter");
    expect(root.hidden).toBe(true);
    expect(host.hidden).toBe(false);
    expect(onExit).toHaveBeenCalledOnce();
  });

  it("shows the real-vim hint on ctrl+c", () => {
    trap.open();
    key("c", { ctrlKey: true });
    // role=status on this element is what makes the way out reach a reader
    expect(status.textContent).toContain("Type  :q!");
  });

  it("typed text enters the buffer in insert mode", () => {
    trap.open();
    type("hi");
    expect(buffer.textContent).toContain("hi");
    expect(status.textContent).toBe("-- INSERT --");
  });

  it("forceClose tears down silently without the exit hook", () => {
    trap.open();
    trap.forceClose();
    expect(root.hidden).toBe(true);
    expect(host.hidden).toBe(false);
    expect(onExit).not.toHaveBeenCalled();
    // and the key handler is disarmed
    type(":q!");
    key("Enter");
    expect(onExit).not.toHaveBeenCalled();
  });
});
