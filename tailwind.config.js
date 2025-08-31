/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use class strategy so you can toggle dark mode programmatically (e.g. ThemeProvider).
  darkMode: 'class',

  // include TS/TSX files and other templates so Tailwind picks up all utilities
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        // keep your existing named color plus any semantic tokens if you want
        nightSky: "#0d1117",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
