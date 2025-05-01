/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: ['animate-shimmer'],
  theme: {
    extend: {
      placeholderColor: {
        'custom-gray': '#6b7280',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
      colors: {
        primary: 'text-slate-700',
      },
    },
  },
  plugins: [],
};
