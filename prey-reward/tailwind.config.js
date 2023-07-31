/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
        "heebo-bold": ["Heebo Bold", "sans-serif"],
        "heebo-medium": ["Heebo Medium", "sans-serif"],
        "ubuntu-bold": ["Ubuntu Bold", "sans-serif"],
        "ubuntu-medium": ["Ubuntu Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
