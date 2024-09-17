const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|input|modal|table|menu|divider|popover|button|ripple|spinner|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      colors: {
        "primary-button": "#005B70", // green button
      },
      fontFamily:{
        Poppins: ["Poppins"]
      }
    },
  },
  plugins: [nextui()],
}