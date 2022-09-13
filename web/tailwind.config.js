/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('../../public/galaxy.png')"
      }
    },
  },
  plugins: [],
}
