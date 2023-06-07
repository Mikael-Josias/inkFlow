/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "white-50": "#ffffff",
        "white-100": "#efefef",
        "white-200": "#dcdcdc",
        "white-300": "#bdbdbd",
        "white-400": "#989898",
        "white-500": "#7c7c7c",
        "white-600": "#656565",
        "white-700": "#525252",
        "white-800": "#464646",
        "white-900": "#3d3d3d",
        "white-950": "#292929",
        "blue-200": "#C5E1F2",
        "blue-400": "#58abd8",
        "blue-500": "#3290C5",
      }
    },
  },
  plugins: [],
}
