// The archive renders as what it now is: text.
//
// These posts are documents from 2008-2013. Their images died with the old
// WordPress host and no backup survives, and the outbound links point at an
// internet that moved on — roughly half are 404s and most of the rest redirect
// to parked domains or unrelated pages. So images are dropped and outbound
// links are unwrapped to the words they wrapped. Links that still resolve on
// this site stay clickable.
//
// This is a display decision, not a rewrite: the markdown keeps every post
// exactly as it was published. Running as rehype — after raw HTML has been
// parsed into elements — means autolinked bare URLs are caught alongside the
// hand-written anchors. Code blocks are skipped outright; see prune().

import { isArchived } from "./era";

interface Node {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
}

/** containers that exist only to hold something we just removed */
const WRAPPERS = new Set([
  "p",
  "div",
  "span",
  "strong",
  "em",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

const isBlank = (node: Node): boolean =>
  node.type === "comment" ||
  (node.type === "text" && !node.value?.trim()) ||
  (node.type === "element" &&
    WRAPPERS.has(node.tagName ?? "") &&
    (node.children ?? []).every(isBlank));

// Every archive post renders at /blog/<permalink>/, so a relative href in one
// resolves against that — which is how `../other-post/` still finds its target.
const POST_URL = "https://www.emrahyumuk.com/blog/post/";

/**
 * The path this href points at on this site, or null if it leads elsewhere.
 * `http://www.emrahyumuk.com/blog/foo`, `/blog/foo` and `../foo` all agree.
 */
function internalPath(href: string): string | null {
  let url;
  try {
    url = new URL(href, POST_URL);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (!/^(?:www\.)?emrahyumuk\.com$/i.test(url.hostname)) return null;
  const path = url.pathname;
  if (path === "/") return "/";
  // directory URLs carry a trailing slash here; a file keeps its extension
  return /\.[a-z0-9]+$/i.test(path) || path.endsWith("/") ? path : `${path}/`;
}

/**
 * @param resolves paths this site actually builds, e.g. `/blog/<permalink>/`.
 *   An internal link to anything else is as dead as an external one.
 */
/**
 * A picture that is gone still meant something: most of these carried a caption,
 * and the prose around them says "as seen below". So an image leaves a marker
 * rather than a hole — labelled where the export kept a caption, and always
 * carrying its original path, so restoring the files is all it would take.
 */
function lostImage(properties: Record<string, unknown> | undefined): Node {
  const caption = [properties?.title, properties?.alt]
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .find((v) => v && !/^[\w .+-]+\.(jpe?g|png|gif|bmp)$/i.test(v));
  const src = typeof properties?.src === "string" ? properties.src : "";
  return {
    type: "element",
    tagName: "span",
    properties: { className: ["lost-media"], "data-src": src },
    children: [
      { type: "text", value: caption ? `[görsel: ${caption}]` : "[görsel]" },
    ],
  };
}

/** what Astro hands a rehype plugin alongside the tree */
interface MarkdownFile {
  data?: { astro?: { frontmatter?: Record<string, unknown> } };
}

/** only the closed 2008-2013 corpus is treated this way — new writing is left alone */
function fromOldBlog(file: MarkdownFile): boolean {
  const raw = file.data?.astro?.frontmatter?.date;
  if (typeof raw !== "string" && !(raw instanceof Date)) return false;
  const date = raw instanceof Date ? raw : new Date(raw);
  return !Number.isNaN(date.getTime()) && isArchived(date);
}

export function rehypeArchive(resolves: ReadonlySet<string>) {
  const keepsItsLink = (properties: Record<string, unknown> | undefined) => {
    const href = properties?.href;
    if (typeof href !== "string") return false;
    if (href.startsWith("#")) return true;
    const path = internalPath(href);
    return path !== null && resolves.has(path);
  };

  const prune = (node: Node): void => {
    if (!node.children) return;
    // Never descend into code. Syntax highlighting has already turned it into
    // nested <span>s by now, and an empty line is an empty <span> — which the
    // blank-wrapper rule below would happily delete, silently reformatting the
    // listing. Nothing inside a code block is a real link or image anyway.
    if (node.tagName === "pre" || node.tagName === "code") return;
    const kept: Node[] = [];
    for (const child of node.children) {
      prune(child);
      if (child.type === "element") {
        if (child.tagName === "img") {
          kept.push(lostImage(child.properties));
          continue;
        }
        if (child.tagName === "a" && !keepsItsLink(child.properties)) {
          kept.push(...(child.children ?? [])); // the words survive, the link does not
          continue;
        }
        if (WRAPPERS.has(child.tagName ?? "") && isBlank(child)) continue;
      }
      kept.push(child);
    }
    node.children = kept;
  };

  return () => (tree: Node, file: MarkdownFile) => {
    if (fromOldBlog(file)) prune(tree);
  };
}
