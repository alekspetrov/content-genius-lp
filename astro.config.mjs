import { SITE_URL } from "./src/config";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), image(), mdx(), solidJs(), partytown()]
});