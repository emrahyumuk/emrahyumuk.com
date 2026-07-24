// Where the old blog ends and new writing begins. Both the content split
// (lib/posts) and the archive's render-time treatment (lib/rehype-archive) key
// off this date, and rehype-archive is imported from astro.config — which
// cannot reach astro:content — so the boundary lives on its own here.
const NEW_ERA = Date.UTC(2014, 0, 1);

export const isArchived = (date: Date) => date.getTime() < NEW_ERA;
