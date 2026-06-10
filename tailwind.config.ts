import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background:          "rgb(0 0 0 / <alpha-value>)",
        foreground:          "rgb(255 255 255 / <alpha-value>)",
        card:                "rgb(10 10 10 / <alpha-value>)",
        "card-foreground":   "rgb(255 255 255 / <alpha-value>)",
        secondary:           "rgb(10 10 10 / <alpha-value>)",
        "muted-foreground":  "rgb(255 255 255 / 0.35)",
        border:              "rgb(255 255 255 / 0.07)",
        // Accent palette — no violet/purple
        cyan:    "rgb(0 229 255 / <alpha-value>)",
        sky:     "rgb(14 165 233 / <alpha-value>)",
        rose:    "rgb(244 63 94 / <alpha-value>)",
        amber:   "rgb(245 158 11 / <alpha-value>)",
        green:   "rgb(16 185 129 / <alpha-value>)",
        primary:             "rgb(239 239 239 / <alpha-value>)",
        "primary-foreground":"rgb(2 2 5 / <alpha-value>)",
        muted:               "rgb(30 30 38 / <alpha-value>)",
        glass:               "rgba(255,255,255,0.03)",
        "glass-border":      "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        syne:     ["var(--font-syne)",     "system-ui", "sans-serif"],
        inter:    ["var(--font-inter)",    "system-ui", "sans-serif"],
        mono:     ["var(--font-mono)",     "JetBrains Mono", "monospace"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-syne)",  "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        serif:   ["var(--font-syne)",  "system-ui", "sans-serif"],
      },
      keyframes: {
        "float-a": {
          "0%":   { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(-30px, 40px) scale(1.08)" },
        },
        "float-b": {
          "0%":   { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(40px, -30px) scale(0.94)" },
        },
        "float-c": {
          "0%":   { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(-20px, -25px) scale(1.1)" },
        },
        "hero-blob-a": {
          "0%":   { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(-4%, 6%) scale(1.06)" },
        },
        "hero-blob-b": {
          "0%":   { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(5%, -5%) scale(0.94)" },
        },
        "particle-rise": {
          "0%":   { transform: "translateY(0)",      opacity: "0" },
          "12%":  {                                   opacity: "0.6" },
          "88%":  {                                   opacity: "0.3" },
          "100%": { transform: "translateY(-180px)", opacity: "0" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":       { opacity: "0.4", transform: "scale(0.85)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%":       { transform: "scale(1.12)" },
        },
      },
      animation: {
        "float-a":       "float-a 20s ease-in-out infinite alternate",
        "float-b":       "float-b 25s ease-in-out infinite alternate-reverse",
        "float-c":       "float-c 15s ease-in-out infinite alternate",
        "hero-blob-a":   "hero-blob-a 15s ease-in-out infinite alternate",
        "hero-blob-b":   "hero-blob-b 18s ease-in-out infinite alternate-reverse",
        "particle-rise": "particle-rise linear infinite",
        shimmer:         "shimmer 2.2s ease-in-out infinite",
        "pulse-dot":     "pulse-dot 2s ease-in-out infinite",
        "breathe":       "breathe 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
