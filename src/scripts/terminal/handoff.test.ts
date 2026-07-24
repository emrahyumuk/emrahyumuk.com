import { beforeEach, describe, expect, it, vi } from "vitest";
import { consumeCommand, stashCommand } from "./handoff";

describe("command handoff", () => {
  beforeEach(() => sessionStorage.clear());

  it("hands a stashed command over exactly once", () => {
    stashCommand("help");
    expect(consumeCommand()).toBe("help");
    expect(consumeCommand()).toBeNull();
  });

  it("returns null when nothing was stashed", () => {
    expect(consumeCommand()).toBeNull();
  });

  it("survives a storage that throws (strict privacy mode)", () => {
    const throwing = () => {
      throw new DOMException("denied");
    };
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(throwing);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(throwing);
    expect(() => stashCommand("help")).not.toThrow();
    expect(consumeCommand()).toBeNull();
    vi.restoreAllMocks();
  });
});
