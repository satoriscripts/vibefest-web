/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        VIBEFEST: ["Akira Expanded", "sans-serif"],
      },
      colors: {
        VIBEFEST: "#e84270",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
