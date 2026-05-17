/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#3b82f6',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e2a5e',
          950: '#0f172a'
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}