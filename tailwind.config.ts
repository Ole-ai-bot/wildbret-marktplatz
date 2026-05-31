import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f3f7f0",
          100: "#e4edd9",
          200: "#c9dbb4",
          300: "#a5c285",
          400: "#7fa659",
          500: "#5d8a38",
          600: "#486d2b",
          700: "#3a5624",
          800: "#2f4420",
          900: "#27391c",
          950: "#111f0b",
        },
        earth: {
          50:  "#faf6f1",
          100: "#f2e9dc",
          200: "#e4d0b8",
          300: "#d3b08d",
          400: "#be8d62",
          500: "#b07444",
          600: "#9a5f39",
          700: "#7f4b30",
          800: "#693e2c",
          900: "#573427",
          950: "#2f1a13",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
