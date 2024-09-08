/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ranade: ['Ranade', 'sans-serif'],
        VarelaRound: ['Varela Round', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': "url('/src/assets/gradient.avif')",
      },
    },
  },
  plugins: [],
}