import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-latin-display)", "var(--font-hindi-display)", "Georgia", "serif"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1) rotate(-1deg)", opacity: "1" },
          "25%": { transform: "scaleY(1.08) scaleX(.94) rotate(1.5deg)", opacity: ".92" },
          "50%": { transform: "scaleY(.95) scaleX(1.04) rotate(-1.5deg)", opacity: "1" },
          "75%": { transform: "scaleY(1.05) scaleX(.97) rotate(1deg)", opacity: ".95" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(5px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: ".55" },
          "50%": { opacity: ".9" },
        },
      },
      animation: {
        flicker: "flicker 1.8s ease-in-out infinite",
        "fade-up": "fade-up .8s ease-out both",
        "fade-in": "fade-in .18s ease-out",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "spin-mandala": "spin 90s linear infinite",
      },
      screens: {
        xs: "375px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        stone: {
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

export default config
