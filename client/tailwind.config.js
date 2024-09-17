/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-button": "#005B70", // green button
        "primary-button-hover":"#00556A", // green button hover
      },
      fontFamily:{
        Poppins: ["Poppins"]
      }
    },
  },
  plugins: [],
}