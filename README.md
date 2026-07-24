# emrahyumuk.com

Personal site of Emrah Yumuk. The homepage is an interactive terminal;
the blog archive preserves 231 Turkish posts from 2008–2013 at their
original permalinks.

Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Development

```sh
pnpm install
pnpm dev       # dev server
pnpm build     # static build into dist/
pnpm preview   # serve the build locally
pnpm check     # astro type check
pnpm lint      # eslint
pnpm test      # vitest
pnpm format    # prettier
```

CI runs lint, format check, type check and tests before it builds or deploys.

## Architecture

```
src/
├── layouts/
│   ├── Shell.astro       # <html> skeleton: meta, OG, theme pre-paint
│   └── Base.astro        # Shell + site chrome (header nav, footer) for inner pages
├── components/
│   ├── Terminal.astro    # the homepage window and markup; the script only wires it
│   ├── ArchiveList.astro # year-grouped, searchable post list
│   └── LogLine.astro     # one dated post row
├── scripts/terminal/     # the terminal itself: shell, fake vim, virtual console,
│                         # boot wiring. Takes its DOM through arguments, so it is
│                         # unit-tested in jsdom rather than only in a browser.
├── lib/
│   ├── posts.ts          # the collection, split into new writing vs closed archive
│   ├── rehype-archive.ts # renders the archive as text: no images, no dead links
│   ├── themes.ts         # the colorschemes, applied pre-paint by Shell.astro
│   ├── profile.ts        # social URLs, mralabs URL, Person JSON-LD
│   └── date.ts           # the one date format the site uses
├── content/archive/      # the 2008-2013 posts, two migrations later
│                         # (frontmatter cleaned, prose untouched)
└── pages/                # routes; root [...slug] emits redirect stubs from the
                          # 2008-era permalinks to /blog/<permalink>/
```

Conventions:

- The UI is English. Archive posts are Turkish documents (`lang="tr"`),
  kept exactly as they were published.
- Post counts are never written by hand. `lib/posts.ts` splits the collection
  at 2014: everything before is the closed archive, everything after is new
  writing, and every page, feed and banner counts from that split.
- The archive's prose is never edited. Its images died with the old WordPress
  host and its outbound links point at an internet that moved on, so
  `lib/rehype-archive.ts` handles both at render time instead: a lost image
  leaves a marker carrying its original path, a dead link leaves its words,
  and links that still resolve on this site stay clickable. The treatment
  applies only to posts dated before 2014 — new writing renders normally.
  (Two edits have ever been made to a post body, both repairing markup the
  export mangled: an ad script that rendered as garbage, and a set of link
  definitions whose titles carried unescaped quotes.)
- Old post URLs never break: every original root permalink builds a
  meta-refresh + canonical stub pointing at its `/blog/` home.
- `/llms.txt` serves an LLM-readable site summary + post index.

## Content migration

The posts have outlived two platforms. They were written on WordPress
between 2008 and 2013, exported to Jekyll when that blog was retired, and
moved here in 2026 — which is why the bodies are HTML-in-Markdown, and why
they point at image paths from a host that no longer exists.

`scripts/migrate-posts.mjs` handled the last leg, converting the Jekyll
`_posts` into `src/content/archive/`. It is one-shot and kept for
provenance; the Jekyll repository is archived privately.
