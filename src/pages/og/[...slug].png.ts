// Build-time OG images for every archive post: the site's terminal window
// with the post title on screen. Pages without a generated image fall back
// to the static /og.jpg (see Shell.astro's ogImage default).
import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { isoDate } from "../../lib/date";
import { getPosts, type Post } from "../../lib/posts";

const require = createRequire(import.meta.url);
const fontData = (file: string) =>
  readFile(require.resolve(`@fontsource/jetbrains-mono/files/${file}`));

// latin-ext carries the Turkish glyphs the post titles need
const fonts = await Promise.all([
  fontData("jetbrains-mono-latin-400-normal.woff"),
  fontData("jetbrains-mono-latin-ext-400-normal.woff"),
  fontData("jetbrains-mono-latin-700-normal.woff"),
  fontData("jetbrains-mono-latin-ext-700-normal.woff"),
]).then(([latin400, latinExt400, latin700, latinExt700]) => [
  { name: "JetBrains Mono", data: latin400, weight: 400 as const },
  { name: "JetBrains Mono", data: latinExt400, weight: 400 as const },
  { name: "JetBrains Mono", data: latin700, weight: 700 as const },
  { name: "JetBrains Mono", data: latinExt700, weight: 700 as const },
]);

// catppuccin mocha, matching the site's default scheme
const C = {
  stage: "#181825",
  window: "#1e1e2e",
  line: "#313244",
  fg: "#cdd6f4",
  muted: "#8087a8",
  green: "#a6e3a1",
  blue: "#89b4fa",
};

const text = (content: string, style: Record<string, unknown>) => ({
  type: "div",
  props: { style, children: content },
});

const markup = (post: Post) => ({
  type: "div",
  props: {
    style: {
      display: "flex",
      width: "100%",
      height: "100%",
      background: C.stage,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "JetBrains Mono",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            width: 1080,
            height: 510,
            background: C.window,
            border: `2px solid ${C.line}`,
            borderRadius: 18,
          },
          children: [
            text("emrahyumuk@web: ~/blog", {
              display: "flex",
              justifyContent: "center",
              padding: "16px 0",
              borderBottom: `2px solid ${C.line}`,
              color: C.muted,
              fontSize: 24,
              fontWeight: 700,
            }),
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "44px 52px",
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: { display: "flex", fontSize: 26, color: C.muted },
                      children: [
                        text("emrahyumuk", { color: C.green }),
                        text(":", {}),
                        text("~/blog", { color: C.blue }),
                        text("$ cat post.md", { marginLeft: 12, color: C.fg }),
                      ],
                    },
                  },
                  text(post.data.title, {
                    marginTop: 32,
                    fontSize: 46,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    color: C.fg,
                  }),
                  {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "auto",
                        fontSize: 24,
                        color: C.muted,
                      },
                      children: [
                        text(isoDate(post.data.date), {}),
                        text("www.emrahyumuk.com", {}),
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
});

export async function getStaticPaths() {
  const { all } = await getPosts();
  return all.map((post) => ({
    params: { slug: post.data.permalink },
    props: { post },
  }));
}

export const GET: APIRoute<{ post: Post }> = async ({ props }) => {
  const svg = await satori(markup(props.post), {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
