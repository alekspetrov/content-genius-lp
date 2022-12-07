/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#6556C5",
          pink: "#DF34BC",
          bg: "#0B0F19",
        },
      },
    },
  },
  plugins: [],
};
