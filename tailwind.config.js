/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        // FWG brand green, same as the admin panel and fggroup.in
        brand: { DEFAULT: "#99C229", dark: "#7DA321", soft: "#F0F7E1" },
        ink: "#0F172A",
      },
    },
  },
  plugins: [],
};
