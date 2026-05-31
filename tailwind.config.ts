import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        forest: {
          50:  "#f2f5ee",
          100: "#e2e9d9",
          200: "#c5d3b3",
          300: "#a1b888",
          400: "#7d9c5e",
          500: "#5e8040",
          600: "#4a6632",
          700: "#3a5028",
          800: "#2c3d1f",
          900: "#1e2b14",
          950: "#111a0b",
        },
        earth: {
          50:  "#faf5ef",
          100: "#f2e6d5",
          200: "#e4ccaa",
          300: "#d2ad7a",
          400: "#be8f52",
          500: "#a87438",
          600: "#8c5d2c",
          700: "#6f4922",
          800: "#55381b",
          900: "#3d2813",
          950: "#20150a",
        },
      },
      letterSpacing: {
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
