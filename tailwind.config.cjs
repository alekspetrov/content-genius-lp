/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", "sans-serif"],
      },
      fontSize: {
        "7xl": ["5rem", "100%"],
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        pink: {
          500: "#D7009B",
        },
        indigo: {
          500: "#7C00AC",
        },
        state: {
          success: "#00D796",
          warning: "#F5A623",
          alert: "#D74D00",
        },
        assistant: {
          1: "#7C00AC",
          2: "#A0A0A0",
          3: "#333333",
          4: "#016C6D",
          5: "#235016",
          5: "#347190",
          6: "#67067F",
          7: "#9D3D39",
          8: "#A3147B",
          9: "#B2592D",
          10: "#685347",
          11: "#B99D4F",
          12: "#D66664",
          13: "#FF8544",
        },
      },
      listStyleImage: {},
    },
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      padding: {
        DEFAULT: "1rem",
      },
      center: true,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
