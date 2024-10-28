/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#02827C',
        },
        black: {
          default: '#000000',
          light: '#1D242D',
          dark: '#52575C',
          300: '#B2BBC6',
          400: '#25282B',
          500: '#090B0E',
          600: '#080C10',
        },
        red: {
          light: '#1D242D',
          dark: '#FF0000',
          100: '#E74F48',
          200: '#FF7E771A',
        },
        white: {
          100: '#ECECEC',
          200: '#ffffff',
          300: '#94A3B8',
          400: '#EBEEF2',
          500: '#E6E6E6',
        },
        blue: {
          light: '#E8F0FE',
          dark: '#0256C5',
          100: '#0256C5',
        },
      },
    },
  },
  plugins: [],
};
