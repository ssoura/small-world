/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#ede3fd",
          100: "#c9aaff",
          200: "#af82fc",
          300: "#975bfd",
          400: "#8845fc",
          500: "#7223fa",
          600: "#5d00ff",
          700: "#5402e3",
          800: "#4a02c6",
          900: "#3c02a1",
        },
      },
    },
  },
  plugins: [],
};
