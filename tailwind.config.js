/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF385C', // Airbnb-style pink/red
        secondary: '#FFE4E8', // Light pink
        accent: '#FF6B6B', // Coral red
        text: '#333',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 