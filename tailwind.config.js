/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 0px 20px 0px rgba(0, 0, 0, 0.25)',
        card: '0px 0px 8px 0px rgba(0, 0, 0, 0.25);',
      },
    },
  },
  plugins: [require('tailwindcss-debug-screens'), require('tailwind-scrollbar-hide')],
};
