/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#2A7F6F',
          dark: '#1E5C51',
          light: '#E6F2F0',
          mid: '#3A9A87',
        },
        cream: {
          DEFAULT: '#F7F3EE',
          dark: '#EDE8E1',
        },
        forest: '#1B3330',
        gold: {
          DEFAULT: '#C4956A',
          light: '#F5EBE0',
          dark: '#A3784F',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
      },
    },
  },
  plugins: [],
}
