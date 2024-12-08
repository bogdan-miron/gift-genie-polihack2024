/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // Disable dark mode entirely
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#F4F0FF',
          100: '#EBE3FF',
          200: '#D9CCFF',
          300: '#BCA6FF',
          400: '#9B82FF',
          500: '#7C5CFF',
          600: '#6443E7',
          700: '#4C2ECC',
          800: '#371FA3',
          900: '#251287',
        },
        background: "#ffffff",
        foreground: "#171717",
        gray: {
          100: '#f5f5f5',
          400: '#9e9e9e',
          500: '#7e7e7e',
          800: '#3d3d3d',
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
