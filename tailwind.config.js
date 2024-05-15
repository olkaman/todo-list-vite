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
        darkMode: {
          text: '#ebebeb',
          placeholder: '#b8b8b8',
          appBg: '#373737',
          grayLight: '#808080',
          gray: '#373737',
          grayDark: '#232323',
        },
        lightMode: {
          text: '#444',
          appBg: '#eff0eb',
          white: '#fff',
        },
        warning: {
          DEFAULT: '#f53f0c',
          dark: '#c9370e',
        },
        accent: 'var(--accent)',
        accentDark: 'var(--accentDark)',
        accentLightModeText: 'var(--accentLightModeText)',
      },
      height: {
        lists: 'calc(100vh - 200px)',
      },
      scale: {
        101: '1.01',
        115: '1.15',
      },
    },
  },
  plugins: [],
}
