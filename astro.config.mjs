import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), image(), mdx()]
});