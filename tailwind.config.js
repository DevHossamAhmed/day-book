/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          600: "var(--color-primary-600)",
        },
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        muted: "var(--color-muted)",
      },
    },
  },
  plugins: [],
};
