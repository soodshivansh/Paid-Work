/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "3rem",
        },
      },
      colors: {
        primary: {
          DEFAULT: '#4335A7',
          light: '#5446c7',
          dark: '#362a85',
        },
        secondary: {
          DEFAULT: '#80C4E9',
          light: '#a3d5f0',
          dark: '#5da5d1',
        },
        background: {
          DEFAULT: '#FFF6E9',
          light: '#ffffff',
          dark: '#f5e6d1',
        },
        accent: {
          DEFAULT: '#FF7F3E',
          light: '#ff9661',
          dark: '#e66526',
        },
      },
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
      textColor: theme => ({
        ...theme('colors'),
      }),
      borderColor: theme => ({
        ...theme('colors'),
      }),
    },
  },
  plugins: [],
}