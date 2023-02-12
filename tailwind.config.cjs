/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#fb310a",
          dark: "#981d05",
        },
        secondary: {
          main: "#03032d",
          light: "#1a1a3d",
          dark: "#10091d",
        },
        neutral: {
          main: "#a1a1c0",
          light: "#f0f7ff",
          // lighter: 'linear-gradient(to top, #f0f7ff 50%, #fff 120%)',
          dark: "#6f6f86",
        },
        gray: {
          1: "#eef6ff",
          2: "#e6f0fe",
        },
      },
    },
  },
  plugins: [],
};
