/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        solana: {
          purple: "#9945FF",
          green: "#14F195",
          cyan: "#00C2FF",
          dark: "#080B11",
          card: "#111622",
          border: "#1E2738",
        },
        jup: {
          brand: "#FBA43A",
          green: "#C7F284",
          accent: "#22C55E",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
