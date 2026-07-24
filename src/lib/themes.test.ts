import { beforeEach, describe, expect, it, vi } from "vitest";
import { THEMES, applyTheme, currentTheme, nextTheme } from "./themes";

describe("themes", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("defaults to the first scheme before anything is applied", () => {
    expect(currentTheme()).toBe(THEMES[0]);
  });

  it("applies a scheme to the document and persists it", () => {
    applyTheme("gruvbox");
    expect(document.documentElement.dataset.theme).toBe("gruvbox");
    expect(localStorage.getItem("theme")).toBe("gruvbox");
  });

  it("cycles through every scheme and wraps around", () => {
    applyTheme(THEMES[0]);
    const seen = [];
    for (let i = 0; i < THEMES.length; i++) {
      seen.push(currentTheme());
      applyTheme(nextTheme());
    }
    expect(seen).toEqual([...THEMES]);
    expect(currentTheme()).toBe(THEMES[0]); // full circle
  });

  it("still applies the theme when persistence is denied", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("denied");
    });
    expect(() => applyTheme("nord")).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe("nord");
    vi.restoreAllMocks();
  });
});
