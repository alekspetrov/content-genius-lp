import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";

export default defineConfig({
  integrations: [tailwind(), sitemap(), image()],
});
