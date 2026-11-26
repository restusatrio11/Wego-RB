/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['"Bodoni Moda"', 'serif'],
        awesome: ['"Bodoni Moda"', '"The Awesome Serif"', '"Fraunces"', 'serif'],
        display: ['"Instrument Serif"', '"Bodoni Moda"', '"Fraunces"', 'serif'],
        fraunces: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        page: {
          bg: '#FFFFFF',
          text: '#111111',
          muted: '#666666',
          border: '#EAEAEA',
        }
      }
    },
  },
  plugins: [],
}
