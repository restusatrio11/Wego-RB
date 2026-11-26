/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
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
