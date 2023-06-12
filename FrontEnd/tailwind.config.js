/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],

  theme: {
    extend: {
      screens: {
        md: "700px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
