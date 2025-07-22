/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}", // App Router + 모든 src 하위
  ],
  theme: {
    extend: {},                   // 커스텀 색·폰트는 여기에
  },
  plugins: [],
};
