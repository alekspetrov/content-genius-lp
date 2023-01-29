/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        graphite: {
          900: "#090809",
          800: "#121212",
          700: "#181818",
          600: "#1F1F1F",
          500: "#2f2f2f",
          400: "#A0A0A0",
          300: "#BDBDBD",
          200: "#D9D9D9",
          100: "#F8F8F8",
        },
        brand: {
          indigo: "#7C00AC",
          pink: "#D7009B",
          success: "#00D796",
          warning: "#F5A623",
          alert: "#D74D00",
        },
      },
      backgroundImage: {
        "gradient-radial-indigo":
          "radial-gradient(50% 50% at 50% 50%, #7c00ac 0%, #090809 100%)",
      },
      backgroundSize: {
        "50%": "50% 50%",
      },
    },
  },
  plugins: [],
};
