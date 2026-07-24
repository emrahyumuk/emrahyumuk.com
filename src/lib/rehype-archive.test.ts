import { describe, expect, it } from "vitest";
import { rehypeArchive } from "./rehype-archive";

const RESOLVES = new Set(["/", "/about/", "/blog/", "/blog/eski-yazi/"]);

interface TestNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: TestNode[];
}

const el = (
  tagName: string,
  properties: Record<string, unknown> = {},
  children: TestNode[] = [],
): TestNode => ({ type: "element", tagName, properties, children });
const text = (value: string): TestNode => ({ type: "text", value });
const link = (href: string, label: string) => el("a", { href }, [text(label)]);

/** run the plugin the way unified does, then read the tree back as text */
const run = (children: TestNode[], date = "2011-05-01T00:00:00.000Z") => {
  const tree: TestNode = { type: "root", children };
  const file = { data: { astro: { frontmatter: { date } } } };
  rehypeArchive(RESOLVES)()(tree as never, file as never);
  return tree;
};
const flatten = (node: TestNode): string =>
  node.type === "text"
    ? (node.value ?? "")
    : (node.children ?? []).map(flatten).join("");
const tags = (node: TestNode): string[] => [
  ...(node.tagName ? [node.tagName] : []),
  ...(node.children ?? []).flatMap(tags),
];

describe("rehypeArchive", () => {
  it("replaces an image with a marker so the prose still makes sense", () => {
    const tree = run([
      el("p", {}, [
        text("önce "),
        el("img", { src: "/dead.jpg" }),
        text(" sonra"),
      ]),
    ]);
    expect(tags(tree)).toEqual(["p", "span"]);
    expect(flatten(tree)).toBe("önce [görsel] sonra");
  });

  it("unwraps an outbound link but keeps its words", () => {
    const tree = run([
      el("p", {}, [
        text("bkz. "),
        link("http://gitti.com/x", "buraya"),
        text(" tıkla"),
      ]),
    ]);
    expect(tags(tree)).toEqual(["p"]);
    expect(flatten(tree)).toBe("bkz. buraya tıkla");
  });

  it("keeps a link to a page this site still serves", () => {
    for (const href of [
      "/blog/eski-yazi/",
      "http://www.emrahyumuk.com/blog/eski-yazi/",
      "https://emrahyumuk.com/blog/eski-yazi",
      "../eski-yazi/", // relative, the way the old blog cross-referenced itself
      "#bolum",
    ]) {
      const tree = run([el("p", {}, [link(href, "eski yazı")])]);
      expect(tags(tree), href).toEqual(["p", "a"]);
    }
  });

  it("unwraps schemes that are not the web", () => {
    for (const href of [
      "mailto:a@b.com",
      "ftp://ftp.x.com/f.zip",
      "ttp://typo",
    ]) {
      const tree = run([el("p", {}, [link(href, "şu")])]);
      expect(tags(tree), href).toEqual(["p"]);
    }
  });

  it("unwraps an internal link to a page that no longer exists", () => {
    const tree = run([
      el("p", {}, [link("http://www.emrahyumuk.com/kayip-sayfa/", "kayıp")]),
    ]);
    expect(tags(tree)).toEqual(["p"]);
    expect(flatten(tree)).toBe("kayıp");
  });

  it("removes a wrapper left empty by what it held", () => {
    const tree = run([
      // the export left bare anchors like this behind; unwrapping empties them
      el("p", { style: "text-align: center" }, [
        el("a", { href: "http://gitti.com/" }, []),
      ]),
      el("p", {}, [text("kalan paragraf")]),
    ]);
    expect(tags(tree)).toEqual(["p"]);
    expect(flatten(tree)).toBe("kalan paragraf");
  });

  it("leaves new writing untouched — this is an archive treatment, not a policy", () => {
    const body = () => [
      el("p", {}, [
        el("img", { src: "/kapak.jpg" }),
        link("https://astro.build/", "Astro"),
      ]),
    ];
    expect(tags(run(body(), "2026-07-25T00:00:00.000Z"))).toEqual([
      "p",
      "img",
      "a",
    ]);
    // and the same body from the old blog does get the treatment
    expect(tags(run(body()))).toEqual(["p", "span"]);
  });

  it("marks a lost image with its caption and keeps the original path", () => {
    const tree = run([
      el("p", {}, [
        el("img", { src: "/images/blog/x.jpg", alt: "ekran görüntüsü" }),
      ]),
    ]);
    const span = tree.children![0].children![0];
    expect(span.properties?.["data-src"]).toBe("/images/blog/x.jpg");
    expect(flatten(span)).toBe("[görsel: ekran görüntüsü]");
  });

  it("falls back to a bare marker when the caption is just a filename", () => {
    const tree = run([
      el("p", {}, [el("img", { src: "/a.jpg", alt: "a.jpg" })]),
    ]);
    expect(flatten(tree)).toBe("[görsel]");
  });

  it("never reformats a highlighted code block", () => {
    // shiki renders a blank line as an empty span; the blank-wrapper rule must
    // not mistake it for a container left empty by a removal
    const line = (inner: TestNode[]) =>
      el("span", { className: ["line"] }, inner);
    const tree = run([
      el("pre", {}, [
        el("code", {}, [
          line([el("span", {}, [text("const a = 1;")])]),
          line([el("span", {}, [text("  ")])]),
          line([el("span", {}, [])]),
          line([el("span", {}, [text("const b = 2;")])]),
        ]),
      ]),
    ]);
    expect(tags(tree)).toEqual([
      "pre",
      "code",
      "span",
      "span",
      "span",
      "span",
      "span",
      "span",
      "span",
      "span",
    ]);
    expect(flatten(tree)).toBe("const a = 1;  const b = 2;");
  });

  it("leaves code blocks alone — their contents are text, not elements", () => {
    const code = el("pre", {}, [
      el("code", {}, [
        text('<img src="x.jpg" /> <a href="http://y.com">y</a>'),
      ]),
    ]);
    const tree = run([code]);
    expect(tags(tree)).toEqual(["pre", "code"]);
    expect(flatten(tree)).toBe(
      '<img src="x.jpg" /> <a href="http://y.com">y</a>',
    );
  });
});
