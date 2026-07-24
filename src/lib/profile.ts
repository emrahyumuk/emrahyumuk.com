// Single source for identity data used across pages, the terminal, and llms.txt.
export const SOCIAL = {
  github: "https://github.com/emrahyumuk",
  linkedin: "https://www.linkedin.com/in/emrahyumuk/",
  untappd: "https://untappd.com/user/m-RA",
  rym: "https://rateyourmusic.com/~m_RA",
  // mail: pending a proper site address
} as const;

export const MRALABS_URL = "https://github.com/mralabs";

export const PERSON_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emrah Yumuk",
  url: "https://www.emrahyumuk.com/",
  jobTitle: "Software Engineer",
  sameAs: Object.values(SOCIAL),
});
