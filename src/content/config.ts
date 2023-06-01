import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    isNew: z.boolean(),
    isDraft: z.boolean(),
    isFeatured: z.boolean(),
    layout: z.literal("../../layouts/BlogLayout.astro"),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    openGraph: z.object({
      image: z.string(),
      description: z.string(),
    }),
    publishDate: z.date(),
  }),
});

const releaseCollection = defineCollection({
  schema: z.object({
    layout: z.literal("../../layouts/BlogLayout.astro"),
    title: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    publishDate: z.date(),
  }),
});

export const collections = {
  blog: blogCollection,
  releases: releaseCollection,
};
