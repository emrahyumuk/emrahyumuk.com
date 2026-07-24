// /llms.txt — a markdown summary of the site for LLM crawlers.
// Full post bodies are deliberately NOT included: 80k words of 2008-era
// Turkish tech news is noise; the titles index gives texture + pointers.
import type { APIRoute } from "astro";
import { isoDate } from "../lib/date";
import { MRALABS_URL } from "../lib/profile";
import { getPosts } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
  const { archived } = await getPosts();

  const lines = [
    "# Emrah Yumuk",
    "",
    "> Personal site of Emrah Yumuk — software engineer. Builds products",
    "> end to end (architecture to cloud) with one pair of hands and a",
    "> small fleet of AI coding agents. Runs mralabs, a one-person software",
    `> lab shipping its own products: ${MRALABS_URL}`,
    "",
    "The homepage (/) is an interactive terminal; type `help` there.",
    "",
    "## Pages",
    "",
    `- [About](${new URL("/about/", site)}): who I am and how to reach me`,
    `- [Blog](${new URL("/blog/", site)}): no new posts yet; new writing will land here`,
    `- [Blog archive](${new URL("/blog/archived/", site)}): ${archived.length} posts, 2008-2013, in Turkish`,
    `- [RSS](${new URL("/rss.xml", site)})`,
    "",
    "## Blog archive (2008-2013, Turkish)",
    "",
    "An archived Turkish blog, untouched since 2013. Tech news and tips",
    "from that internet era (Firefox, Pardus Linux, YouTube bans in Turkey,",
    "concert calendars), personal and literary essays, C# tutorials, music",
    "and film notes. Everything here dates from that period.",
    "",
    ...archived.map(
      (p) =>
        `- ${isoDate(p.data.date)} [${p.data.title}](${new URL(`/blog/${p.data.permalink}/`, site)})`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
