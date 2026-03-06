import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f8f7f3",
        ink: "#171515",
        accent: "#f95f35",
        teal: "#2a9d8f",
        sky: "#6bb8ff",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-space)", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 40px rgba(23, 21, 21, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
