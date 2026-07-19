/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#0A0F0D",
        "espresso-2": "#101614",
        cream: "#F5EFE2",
        "cream-2": "#EDE5D3",
        mint: "#1FCE8A",
        "mint-dark": "#17A46E",
        caramel: "#F4A259",
        sun: "#FFD166",
        ink: "#141A17",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "sans-serif"],
        body: ['"Figtree Variable"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      borderRadius: { blob: "42% 58% 60% 40% / 45% 40% 60% 55%" },
    },
  },
  plugins: [],
};
