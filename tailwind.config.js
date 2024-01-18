/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "monospace"],
    },
    screens: {
      full: "1000px",
      laptop: "750px",
      tablet: "490px",
    },
    extend: {
      colors: {
        red: "#E31010",
        notAvail: "#F5F6F9",
        hoverRed: "rgba(227, 16, 16, 0.5)",
        green: "#98D45F",
        yellow: "#EEE962",
        blue: "#00B3BD",
        hoverBlue: "#008080",
        reserved: "#CCCCCC",
        hoverGreen: "#85B754"
      },
      fontFamily: {
        special: ["Pontano Sans", "monospace"],
      },
    },
  },
  plugins: [],
};
