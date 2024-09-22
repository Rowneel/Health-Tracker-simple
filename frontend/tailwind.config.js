/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        green: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#F9FFE5',
          300: '#9DDE8B',
          400: '#40A578',
          500: '#005052',
        },
      }
    },
  },
  plugins: [],
}
