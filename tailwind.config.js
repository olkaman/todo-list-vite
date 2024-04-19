/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        textColor: {
          darkMode: '#fff',
          DEFAULT: '#333',
        },
        bgColor: {
          darkMode: '#373737',
          DEFAULT: '#fff',
          appBg: '#eff0eb',
        },
        gray: {
          light: '#808080',
          DEFAULT: '#373737',
          dark: '#232323',
        },
        accent: 'var(--accent)',
      },
      height: {
        lists: 'calc(100vh - 200px)',
      },
    },
  },
  plugins: [],
};
