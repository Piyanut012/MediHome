/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'first': '#11942d',
        'second': '#b0f792',
        'third': '#e0ffd9',
        'fourth': '#fffdf9',
        'fifth': '#fcffc5',
      }
    }
  },
  plugins: [],
}

