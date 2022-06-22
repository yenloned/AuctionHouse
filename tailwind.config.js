// tailwind.config.js
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './comps/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
    fontFamily: {
      family_header1: ['"Kdam Thmor Pro"', 'sans-serif'],
      family_body1:["'Rubik'", 'sans-serif'], //thicker
      family_body2:["'Barlow'", 'sans-serif'] //thinner
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}