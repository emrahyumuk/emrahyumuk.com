/** YYYY-MM-DD in the blog's home timezone — the one date format the site uses. */
export const isoDate = (d: Date) =>
  d.toLocaleDateString("en-CA", { timeZone: "Europe/Istanbul" });
