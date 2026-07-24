import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const archive = defineCollection({
  loader: glob({ base: "./src/content/archive", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    permalink: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

export const collections = { archive };
