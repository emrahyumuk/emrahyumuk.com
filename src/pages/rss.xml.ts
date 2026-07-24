import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
  const { all } = await getPosts();
  return rss({
    title: "Emrah Yumuk",
    description: "Writing on and off since 2008.",
    site: site!,
    items: all.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/blog/${post.data.permalink}/`,
    })),
  });
};
