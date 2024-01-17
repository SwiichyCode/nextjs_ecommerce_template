/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "#32324D",
        secondary: "#666687",
        tertiary: "#4945FF",
      },
      backgroundColor: {
        primary: "#F6F6F9",
        secondary: "#F0F0FF",
        tertiary: "#4945FF",
        quarternary: "#666687",
      },
      borderColor: {
        primary: "#EAEAEF",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // require("tailwindcss/aspect-ratio"),
  ],
};
