/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      body: 'EB Garamond, serif',
      display: 'Open Sans, sans-serif'
    }
  },
  plugins: [require('tailwindcss-primeui'), require('@tailwindcss/typography')],
  darkMode: 'class'
}
