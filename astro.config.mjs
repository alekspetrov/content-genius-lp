import { SITE_URL } from "./src/config";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import robotsTxt from 'astro-robots-txt';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap({
      filter: (page) =>
        page !== `${SITE_URL}early-adopters-discount/`,
      serialize(item) {
        if (item.url === `${SITE_URL}`) {
          item.priority = 1;
          return item
        }
        if (item.url === `${SITE_URL}blog/`) {
          item.priority = 1;
          return item
        }
        item.priority = 0.8;
        return item
      },
      changefreq: 'hourly',
    }),
    image(),
    mdx(),
    solidJs(),
    partytown(),
    robotsTxt(),
  ],
});
