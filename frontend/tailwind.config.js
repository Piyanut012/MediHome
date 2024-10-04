/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      theme1: '#11942D',
      theme2: '#B0F792',
      theme3: '#E0FFD9',
      theme4: '#FFFDF9',
      theme5: '#FCFFC5',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  
}

