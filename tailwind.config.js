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
          darkMode: '#ebebeb',
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
        darkMode: {
          text: '#ebebeb',
          placeholder: '#b8b8b8',
          appBg: '#373737',
          grayLight: '#808080',
          gray: '#373737',
          grayDark: '#232323',
        },
        lightMode: {
          text: '#333',
          appBg: '#eff0eb',
          white: '#fff',
        },
        accent: 'var(--accent)',
        accentDark: 'var(--accentDark)',
        accentDarkMode: 'var(--accent)',
        accentDarkModeHover: 'var(--accentDark)',
        accentLightMode: 'var(--accentLightMode)',
        accentLightModeHover: 'var(--accentLightModeHover)',
      },
      height: {
        lists: 'calc(100vh - 200px)',
      },
    },
  },
  plugins: [],
}
