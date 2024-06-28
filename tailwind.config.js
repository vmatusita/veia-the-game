/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './scripts/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        'poetsen': ['Poetsen One', 'sans-serif']
      }
    },
  },
  plugins: [],
}
