// tailwind.config.js
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './comps/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      family_header1: ['"Kdam Thmor Pro"', 'sans-serif'],
      family_header2: ["'Ubuntu'", 'sans-serif'],
      family_body1:["'Rubik'", 'sans-serif'], //thick
      family_body2:["'Barlow'", 'sans-serif'], //thin
      family_body3:["'Manrope'", 'sans-serif'], //thicker
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}