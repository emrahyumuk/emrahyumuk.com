// Everything the terminal prints, plus its interaction timings.
// Keeping copy and constants here leaves Terminal.astro as pure wiring.
import { SOCIAL, MRALABS_URL } from "../../lib/profile";

export const DAY_MS = 86_400_000;

/** interaction timings, in ms */
export const TIMING = {
  bootPause: 350,
  typeBase: 55,
  typeJitter: 45,
  navigate: 300,
  logout: 400,
  train: 3200,
} as const;

export const ROUTES = {
  home: "/",
  blog: "/blog/",
  about: "/about/",
  archived: "/blog/archived/",
} as const;

export const PS1 = `<span class="user">emrahyumuk</span>:<span class="path">~</span>$ `;

/** `cat`/`cd` targets → the page behind them */
export const FILE_ROUTES: Record<string, string> = {
  "about.md": ROUTES.about,
  blog: ROUTES.blog,
  "blog/": ROUTES.blog,
};

const extLink = (url: string) => {
  const label = url
    .replace("https://www.", "")
    .replace("https://", "")
    .replace(/\/$/, "");
  return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
};

const lab = `<a href="${MRALABS_URL}" target="_blank" rel="noopener"><b>mralabs</b></a>`;

export const UI = {
  whoami: [
    "emrah — software engineer. architecture to cloud, one pair of hands,",
    `a small fleet of AI agents. building ${lab}: a one-person lab`,
    "shipping its own products.",
  ],
  hint: `# type '<b>help</b>', or just click around`,
  // the archive size comes from the collection at build time (see lib/posts)
  help: (archivedCount: number) => [
    "  <b>whoami</b>    who is this guy",
    "  <b>ls</b>        what's here",
    "  <b>history</b>   where this site began",
    `  <b>blog</b>      nothing new yet, ${archivedCount} archived`,
    "  <b>about</b>     longer version",
    "  <b>contact</b>   say hi",
    "  <b>theme</b>     colorschemes, try '<b>theme gruvbox</b>'",
    "  <b>clear</b>     wipe the screen (or ctrl+l)",
    "  <b>exit</b>      end the session, see what happens",
  ],
  history: (archivedCount: number) => [
    `2008-01-31  <a href="/blog/ilk-yazi-blog-nedir-niye-benim-de-blogum-var/">ilk yazı: "blog nedir? niye benim de blogum var?"</a>`,
    `2008-2013   ${archivedCount} posts about that internet era <span class="dim">(in turkish)</span>`,
    `2013-2026   a long quiet decade <span class="dim">of life, work, and other people's software</span>`,
    `2026-       <b>mralabs</b>: back to building my own`,
  ],
  contact: [
    `github    ${extLink(SOCIAL.github)}`,
    `linkedin  ${extLink(SOCIAL.linkedin)}`,
    `untappd   ${extLink(SOCIAL.untappd)}`,
    `rym       ${extLink(SOCIAL.rym)}`,
    // mail: pending a proper site address
    `rss       <a href="/rss.xml">/rss.xml</a>`,
  ],
  opening: (path: string) => `opening ${path} …`,
  notFound: (cmd: string) =>
    `bash: ${cmd}: command not found. try '<b>help</b>'`,
  sudoLecture:
    "we trust you have received the usual lecture. it changes nothing.",
  sudoDenied:
    "sudo: emrah is not in the sudoers file. This incident will be reported.",
  nano: "nano: command not found (this is a vim household)",
  rm: "rm: preserved as written. nice try though.",
  vimExited: "# vim exited. you're free, for now.",
  trainFallback: "sl: (imagine a steam locomotive passing by)",
  welcomeBack: "# welcome back. there is no way out of here.",
} as const;

export const TRAIN_ART = [
  "      ====        ________                ___________",
  "  _D _|  |_______/        \\__I_I_____===__|_________|",
  "   |(_)---  |   H\\________/ |   |        =|___ ___|",
  "   /     |  |   H  |  |     |   |         ||_| |_||",
  "  |      |  |   H  |__--------------------| [___] |",
  "  | ________|___H__/__|_____/[][]~\\_______|       |",
  "  |/ |   |-----------I_____I [][] []  D   |=======|",
  "  \\_/      \\_O=====O=====O=====O_/      \\_________/",
].join("\n");

export const neofetchArt = (theme: string) => [
  `<span class="user">      ___     </span>  <span class="user">emrahyumuk</span>`,
  `<span class="user">     (.. |    </span>  ------------`,
  `<span class="user">     (&lt;&gt; |    </span>  OS: mralabs linux`,
  `<span class="user">    / __  \\   </span>  Host: emrahyumuk.com`,
  `<span class="user">   ( /  \\ /|  </span>  Uptime: since 2008`,
  `<span class="user">  _/\\ __)/_)  </span>  Shell: this one`,
  `<span class="user">  \\/-____\\/   </span>  Theme: ${theme}`,
];
