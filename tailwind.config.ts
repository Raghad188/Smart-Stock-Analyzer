import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06101f",
        panel: "#0b1a2f",
        primary: "#1688ff",
        cyan: "#43d7ff"
      },
      fontFamily: { sans: ["var(--font-tajawal)", "Arial", "sans-serif"] }
    }
  },
  plugins: []
};

export default config;
