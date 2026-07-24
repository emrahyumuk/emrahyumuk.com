// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import rehypeRaw from "rehype-raw";
import matter from "gray-matter";
import { rehypeArchive } from "./src/lib/rehype-archive.ts";

// astro:content isn't importable from here, so read the frontmatter directly —
// the same `permalink` field the routes key on, parsed the way migration wrote it.
const ARCHIVE_DIR = "./src/content/archive";
const permalinks = readdirSync(ARCHIVE_DIR)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const { data } = matter(readFileSync(`${ARCHIVE_DIR}/${file}`, "utf8"));
    if (!data.permalink) throw new Error(`no permalink frontmatter in ${file}`);
    return data.permalink;
  });

// root-level /<permalink>/ pages are noindex redirect stubs to /blog/<permalink>/
const stubPaths = new Set(permalinks.map((p) => `/${p}/`));

// every path this site actually serves — an archive link to anything else is
// as dead as an outbound one, so rehypeArchive unwraps it
const resolvablePaths = new Set([
  "/",
  "/about/",
  "/blog/",
  "/blog/archived/",
  ...stubPaths,
  ...permalinks.map((p) => `/blog/${p}/`),
]);

export default defineConfig({
  site: "https://www.emrahyumuk.com",
  // "ignore": GitHub Pages already 301s directory URLs to their slashed
  // form; "always" would only make the local preview serve its own error
  // page for slashless paths instead of our 404.
  trailingSlash: "ignore",
  markdown: {
    // These posts embed raw HTML, which Astro leaves as opaque `raw` nodes until
    // after user plugins have run — so rehypeArchive would only ever see the
    // markdown-native links. Parsing it up front puts every hand-written anchor
    // and <img> in the tree alongside them. Code blocks stay safe either way:
    // their contents are text, not elements.
    processor: unified({
      rehypePlugins: [rehypeRaw, rehypeArchive(resolvablePaths)],
    }),
  },
  integrations: [
    sitemap({
      // decode before matching: one 2008 permalink carries a U+2019 that the
      // sitemap URL percent-encodes, and stubPaths holds the raw form
      filter: (page) =>
        !stubPaths.has(decodeURIComponent(new URL(page).pathname)),
    }),
  ],
});
