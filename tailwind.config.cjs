/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        // lg: ["1.5rem", "2rem"],
        "7xl": ["5rem", "100%"],
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: {
          900: "#090809",
          800: "#121212",
          700: "#181818",
          600: "#1F1F1F",
          500: "#2f2f2f",
          450: "#757575",
          400: "#A0A0A0",
          300: "#BDBDBD",
          200: "#D9D9D9",
          150: "#F0F0F0",
          100: "#F8F8F8",
        },
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
      },
      backgroundImage: {
        "gradient-radial-indigo":
          "radial-gradient(50% 50% at 50% 50%, #7c00ac 0%, #090809 100%)",
      },
      backgroundSize: {
        "50%": "50% 50%",
      },
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
  plugins: [],
};
