/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fade 0.3s ease-in-out",
        bookmark: "bookmark 0.25s cubic-bezier(0, 0, 0.2, 1)",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        bookmark: {
          "0%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        "2md": "890px",
        // => @media (min-width: 890px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      boxShadow: {
        cart: "0 20px 48px rgb(52 72 123 / 10%)",
      },
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
