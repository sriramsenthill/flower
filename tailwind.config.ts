/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #7BDCBA, #9BC8FF)',
      },
      colors: {
        'custom-gray': '#55525d',
        'custom-pink': '#e36492',
        'custom-green': '#58bc99',
        'button-primary': '#e36492',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
