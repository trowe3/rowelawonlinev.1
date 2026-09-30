/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#0E2F24', light: '#164334', dark: '#081C16' },
        onyx: { DEFAULT: '#0B0D0C', light: '#171A19' },
        gold: { DEFAULT: '#C5A880', light: '#D6BC96', dark: '#A88A60' },
        parchment: '#F9FAF7',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Arial', 'sans-serif'],
      },
    },
  },
};
