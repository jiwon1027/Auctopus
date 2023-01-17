/** @type {import('tailwindcss').Config} */
// const colors = require("tailwindcss/colors");

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blue: "#1fb6ff",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        "gray-dark": "#273444",
        gray: "#D1D1D1",
        "gray-light": "#d3dce6",
        // custom
        "turtle-dark": "#386641",
        "turtle-standard": "#6A994E", // bg-turtle-standard
        "turtle-light": "#A7C957",
        "grey-dark": "#5C5B5B",
        "grey-standard": "#8E8E8E",
        "grey-light": "#E6E6E6",
        "grey-dim": "#D1D1D1",
      },
      fontWeight: {
        hairline: 100,
        "extra-light": 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        "extra-bold": 800,
        black: 900,
      },
    },
  },
  plugins: [],
};
