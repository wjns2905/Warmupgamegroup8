/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#171B35',
          light: '#23294E',
          dark: '#0F1224'
        },
        violet: {
          DEFAULT: '#7855D9',
          light: '#9171ED',
          dark: '#5838B5',
          deep: '#382568'
        },
        mint: {
          DEFAULT: '#58CDB5',
          light: '#7FE3CE',
          dark: '#3CA792'
        },
        amber: {
          DEFAULT: '#FFCA64',
          light: '#FFE098',
          dark: '#E5AB3A'
        },
        cream: {
          DEFAULT: '#F6F3EA',
          light: '#FFFFFF',
          dark: '#E7E2D2'
        },
        success: '#42D392',
        coral: '#F46D75',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['Be Vietnam Pro', 'Inter', 'system-ui', 'sans-serif'],
        digital: ['Chakra Petch', 'Share Tech Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.4s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(120, 85, 217, 0.8))' },
          '50%': { opacity: '.7', filter: 'drop-shadow(0 0 5px rgba(120, 85, 217, 0.3))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      }
    },
  },
  plugins: [],
}
