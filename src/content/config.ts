import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    isNew: z.boolean(),
    isDraft: z.boolean(),
    isFeatured: z.boolean(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    cover: image().refine((img) => img.width >= 1200, {
      message: "Cover image must be at least 1200 pixels wide!",
    }),
    coverAlt: z.string(),
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
