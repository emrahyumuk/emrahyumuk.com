// One-shot migration: Jekyll _posts/*.md → src/content/archive/*.md
// Keeps only the frontmatter we care about; body is passed through untouched.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SRC = "_posts";
const OUT = "src/content/archive";

const NAMED = {
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  amp: "&",
  quot: '"',
  nbsp: " ",
};
const decode = (s) =>
  String(s)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&([a-z]+);/g, (_, n) => NAMED[n] ?? `&${n};`);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
const fails = [];
for (const file of fs.readdirSync(SRC).sort()) {
  try {
    const { data, content } = matter(
      fs.readFileSync(path.join(SRC, file), "utf8"),
    );
    // decodeURIComponent: one 2008 permalink carries a %-encoded ’; the decoded
    // form is what Astro matches when the old encoded URL is requested
    const permalink = decodeURIComponent(
      String(data.permalink).replace(/^\/|\/$/g, ""),
    );
    if (!permalink) throw new Error("no permalink");
    const fm = {
      title: decode(data.title),
      date: new Date(data.date).toISOString(),
      permalink,
      categories: (data.categories ?? []).map(String),
      tags: (data.tags ?? []).map(String),
    };
    const yaml = [
      "---",
      `title: ${JSON.stringify(fm.title)}`,
      `date: ${fm.date}`,
      `permalink: ${JSON.stringify(fm.permalink)}`,
      `categories: ${JSON.stringify(fm.categories)}`,
      `tags: ${JSON.stringify(fm.tags)}`,
      "---",
      "",
    ].join("\n");
    fs.writeFileSync(
      path.join(OUT, `${permalink}.md`),
      yaml + content.trimStart(),
    );
    ok++;
  } catch (e) {
    fails.push(`${file}: ${e.message}`);
  }
}
console.log(`migrated ${ok}, failed ${fails.length}`);
if (fails.length) console.log(fails.join("\n"));
