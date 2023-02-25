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
      lg: '1rem',
      md: '0.9rem',
      base: '0.75rem',
      sm: '0.65rem',
      xs: '0.6rem'
    }
  },
  plugins: [],
}
