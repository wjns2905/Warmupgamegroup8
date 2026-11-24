/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#151C45',
          dark: '#0D122D',
          light: '#242C5F'
        },
        purple: {
          DEFAULT: '#7965F2',
          light: '#9382F8',
          dark: '#5D49D6'
        },
        orange: {
          DEFAULT: '#FF8426',
          light: '#FFA053',
          dark: '#E06A12'
        },
        mint: {
          DEFAULT: '#55C7AA',
          light: '#72D6BC',
          dark: '#3CAE90'
        },
        cream: {
          DEFAULT: '#FFF4DF',
          light: '#FFFFFF',
          dark: '#F3E5C8'
        },
        yellow: {
          DEFAULT: '#FFD343',
          light: '#FFE073',
          dark: '#E5BC28'
        },
        coral: {
          DEFAULT: '#F47E93',
          light: '#F89DAE',
          dark: '#D85F75'
        }
      },
      fontFamily: {
        heading: ['"Baloo 2"', '"Be Vietnam Pro"', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        comic: ['Bungee', '"Baloo 2"', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'comic': '4px 4px 0px #151C45',
        'comic-sm': '2px 2px 0px #151C45',
        'comic-lg': '6px 6px 0px #151C45',
        'comic-xl': '8px 8px 0px #151C45',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
