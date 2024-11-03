/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/**/*.js'],
  theme: {
    extend: {
      // Custom media queries screen size
      screens: {
        xs: '340px',
        tab: '834px',
        pc: '1320px',
      },
      // Custom font family
      fontFamily: {
        lato: ['"Lato"', 'sans-serif'],
      },
      // Custom colors
      colors: {
        'clr-woodsmoke': '#131313',
        'clr-paradiso': '#0E7A81',
      },
    },
  },
  plugins: [require('daisyui')],

  // Config for daisyUI
  daisyui: {
    themes: ['light'], // only 'light' theme available
    prefix: 'da-', // change prefix for all classes
  },
};
