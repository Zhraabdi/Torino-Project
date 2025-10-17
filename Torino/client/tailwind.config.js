
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "var(--text-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        complementary: "var(--complementary-color)",
        border: "var(--border-color)",
      },
      fontFamily: {
        sans: ['var(--font-yekan)'],
        yekanbakhbold:["YekanBakhBold"],
        yekanbakhheavy:["YekanBakhHeavy"],
        yekanbakhlight:["YekanBakhLight"],
        yekanbakhregular:["YekanBakhRegular"],


      },
    },
  },
  plugins: [],
}

