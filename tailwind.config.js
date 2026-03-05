/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono:  ["var(--font-mono)", "monospace"],
        sans:  ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        accent: "#3d6b4f",
        "accent-light": "#edf4f0",
      },
    },
  },
  plugins: [],
};
