/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // ensure dynamic background color classes like `bg-sky-500` or `bg-sky-500/50` are generated
    { pattern: /bg-[a-z]+-\d{3}(?:\/\d{1,3})?/ },
  ],
  plugins: [],
};
