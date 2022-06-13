// tailwind.config.js
module.exports = {
  purge: [],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './comps/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
    fontFamily: {
      family_header1: ['"Kdam Thmor Pro"', 'sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}