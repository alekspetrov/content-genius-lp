import { SITE_URL } from "./src/config";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import robotsTxt from "astro-robots-txt";
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";
import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap({
      filter: (page) => page !== `${SITE_URL}early-adopters-discount/`,
      serialize(item) {
        if (item.url === `${SITE_URL}`) {
          item.priority = 1;
          return item;
        }
        if (item.url === `${SITE_URL}blog/`) {
          item.priority = 1;
          return item;
        }
        if (item.url === `${SITE_URL}tools/`) {
          item.priority = 1;
          return item;
        }
        if (item.url === `${SITE_URL}terms/`) {
          item.priority = 0.5;
          return item;
        }
        if (item.url === `${SITE_URL}privacy/`) {
          item.priority = 0.5;
          return item;
        }
        item.priority = 0.8;
        return item;
      },
      changefreq: "hourly",
    }),
    mdx(),
    robotsTxt(),
    webmanifest({
      name: "Content Genius",
      icon: "src/assets/favicon.svg",
      short_name: "Content Genius",
      description:
        "Get a better ChatGPT experience. Perfect for copywriters, marketers, social media managers, and professionals from various fields. No specific expertise is necessary",
      theme_color: "#FFFFFF",
      background_color: "#FFFFFF",
      display: "standalone",
      config: {
        icon: "src/assets/favicon.svg",
        iconPurpose: ['badge', 'maskable'], 
        insertAppleTouchLinks: true,
      },
    }),
    solidJs(),
    partytown({
      config: {
        forward: [
          "dataLayer.push",
          "ym",
          "fbq"],
      },
    }),
  ],
});
