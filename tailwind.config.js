/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    boxShadow: {
      'custom-shadow': '0px 5px 24px 0px rgba(66, 68, 90, 1)',
    },
    extend: {
      maxWidth: {
        '200px': '200px',
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',
        '1100px': '1100px',
      },
      Colors: {
        'myPink': '#d500ff',
        'myBlue': '#3461eb',
        'blueBg': '#3461eb'
      }
    },
  },
  plugins: [],
}

