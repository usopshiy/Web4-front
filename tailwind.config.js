/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': {'min': '1px', 'max': '639px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '640px', 'max': '1198px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1199px', 'max': '1900px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1901px', 'max': '1902px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1903px'},
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
    },
  },
  plugins: [],
}
