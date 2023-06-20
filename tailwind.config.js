/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#bd6736',
        'custom-black': '#1c1917',
      },
    },
  },
  plugins: [],
}

