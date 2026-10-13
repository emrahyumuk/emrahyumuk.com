# emrahyumuk.com

Personal site of Emrah Yumuk: an interactive terminal homepage plus a blog whose archive holds the Turkish posts of 2008-2013. Astro 7, static output, pnpm, deployed to GitHub Pages. This is a public repo; write everything in it (code, comments, commit messages) in English.

## Commands

Run tools through pnpm (`pnpm exec <tool>`), never `npx`. The scripts in `package.json`:

- `pnpm dev`, `pnpm build` (into `dist/`), `pnpm preview`
- `pnpm lint` (eslint), `pnpm check` (astro type check), `pnpm test` (vitest, jsdom)
- `pnpm format` (prettier, writes), `pnpm format:check`

CI runs lint, format:check, check and test before it builds. Run the same four before calling a change done. Node >= 22.12; `packageManager` pins pnpm 9.12.1, leave it.

## Layout

- `src/pages/`: routes. Root `[...slug].astro` emits noindex redirect stubs from the old 2008-era permalinks to `/blog/<permalink>/`. `og/[...slug].png.ts` renders per-post OG images (satori); `rss.xml.ts` and `llms.txt.ts` are generated.
- `src/layouts/`: `Shell.astro` is the html skeleton (meta, OG, theme pre-paint); `Base.astro` adds the header and footer for inner pages.
- `src/scripts/terminal/`: the homepage terminal. These modules receive their DOM as arguments so they test in jsdom; `components/Terminal.astro` only looks up elements and wires them.
- `src/lib/`: `posts.ts` is the only place the collection is read and split; `era.ts` holds the 2014 boundary; `rehype-archive.ts` is the render-time archive treatment (imported by `astro.config.mjs`, which cannot reach `astro:content`).
- `src/content.config.ts`: one collection, `archive`, loaded from `src/content/archive/*.md`.
- `drafts/`: local-only post drafts. It is gitignored and not built; nothing in it is published. Keep the only copy of a draft there, not in a temp dir.
- `scripts/migrate-posts.mjs`: one-shot Jekyll import. It wipes `src/content/archive/` first, so do not run it.

## Content

Front matter schema (all required): `title`, `date`, `permalink`, `categories: []`, `tags: []`. The permalink is the URL slug and must be unique; `astro.config.mjs` throws at config time if a post lacks one.

To add a post: create `src/content/archive/<permalink>.md` with that front matter. A date in 2014 or later counts as new writing; earlier dates are the closed archive. Never hand-write post counts: pages, feed and banner derive them from `getPosts()`. Check the post page's `lang` before publishing in English: `src/pages/blog/[...slug].astro` currently sets `lang="tr"` for every post.

The 2008-2013 posts are preserved as published. Do not edit their prose. Their dead images and outbound links are handled at render time by `rehype-archive.ts` (a lost image leaves a marker with its original path; links off-site are unwrapped; links that resolve on this site stay). That treatment is gated on the post date, so new posts render normally.

Markdown pipeline: Astro 7 ignores `markdown.rehypePlugins`; use `markdown.processor: unified(...)`, with `rehypeRaw` first. The content layer caches rendered markdown, so clear `.astro` before verifying a plugin edit, and verify bulk transforms by diffing rendered output, not counts.

## Style

- The UI is English. Archive posts are Turkish documents.
- Public-repo code quality: no god files, no magic numbers (use named constants), no dead code or unused exports, no lazy names, guard browser APIs that can throw (`localStorage`). Comments explain why. A comment that states an invariant must be true or enforced.
- Prose (posts, site text, copy) must not read as AI-written: no em dashes, no stock phrases or "not just X but Y" constructions, no forced triads, sparing bold, sentence-case headings, straight quotes, no emoji.
- ESLint runs jsx-a11y on `.astro`: images need `alt`, controls labels, headings in order.
- SEO and meta go through `Shell.astro`: title, description, canonical, OG image (default `/og.jpg`), JSON-LD. Pass them as props rather than adding tags per page. The sitemap excludes the redirect stubs.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: quality job (install, lint, format check, check, test), then `withastro/action` build, then `actions/deploy-pages`. Pages takes one deployment at a time; space out pushes. The custom domain is `public/CNAME`.

## Working agreements

- Never commit, stage, push or open a PR without the owner's explicit approval for that action.
- Review cadence: per commit, run the checks only. Do one fresh-context review per task at the end, before the push. Never review per commit, never loop "until PASS".
- Private, machine-local notes about this repo belong in the owner's Claude memory, not in this file.
