/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    fontSize: {
      '3xl': '3.5rem',
      '2xl': '3rem',
      xl: '2rem',
      'mm-lg': '1.5rem',
      'm-lg': '1.2rem',
      lg: '1rem',
      md: '0.9rem',
      base: '0.75rem',
      sm: '0.65rem',
      xs: '0.6rem'
    }
  },
  plugins: [],
}
