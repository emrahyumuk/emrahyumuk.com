// Single source for the post collection. New writing lands in the same
// collection as the 2008-2013 blog, so the era split — not the raw length —
// is what pages should count and list.
import { getCollection, type CollectionEntry } from "astro:content";
import { isArchived } from "./era";

export type Post = CollectionEntry<"archive">;

const fromOldBlog = (post: Post) => isArchived(post.data.date);

export interface Posts {
  /** every post, newest first */
  all: Post[];
  /** written since the site came back */
  recent: Post[];
  /** the closed 2008-2013 corpus */
  archived: Post[];
}

export async function getPosts(): Promise<Posts> {
  const all = (await getCollection("archive")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  return {
    all,
    recent: all.filter((post) => !fromOldBlog(post)),
    archived: all.filter(fromOldBlog),
  };
}
