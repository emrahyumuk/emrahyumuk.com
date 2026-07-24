/** terminal colorschemes — each has a [data-theme] block in global.css.
    THEMES[0] is the default and must match the :root token block. */
export const THEMES = [
  "catppuccin",
  "one-dark",
  "gruvbox",
  "dracula",
  "nord",
  "tokyo-night",
  "catppuccin-latte",
  "solarized-light",
] as const;

export type Theme = (typeof THEMES)[number];

/** picked before first paint when nothing is stored, per OS preference */
export const DEFAULT_DARK = "catppuccin";
export const DEFAULT_LIGHT = "catppuccin-latte";

/** the site's first release stored a bare "dark"/"light" instead of a scheme */
export const LEGACY_ALIASES: Record<string, Theme> = {
  dark: DEFAULT_DARK,
  light: DEFAULT_LIGHT,
};

export const isTheme = (name: unknown): name is Theme =>
  (THEMES as readonly unknown[]).includes(name);

// localStorage can throw under strict privacy settings; a theme that only
// lasts the session is an acceptable fallback.
const persist = (name: string) => {
  try {
    localStorage.setItem("theme", name);
  } catch {
    /* session-only theme is fine */
  }
};

export const applyTheme = (name: string) => {
  document.documentElement.dataset.theme = name;
  persist(name);
};

export const currentTheme = (): string =>
  document.documentElement.dataset.theme ?? THEMES[0];

export const nextTheme = () => {
  const current = currentTheme();
  // an unknown scheme (hand-edited storage) starts the cycle from the top
  const idx = isTheme(current) ? THEMES.indexOf(current) : -1;
  return THEMES[(idx + 1) % THEMES.length];
};
