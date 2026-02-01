/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vscode-blue': '#007ACC',
        'success-green': '#4EC9B0',
        'terminal-green': '#00FF00',
        'dark-bg': '#1E1E1E',
        'dark-surface': '#252526',
        'dark-border': '#3C3C3C',
      },
    },
  },
  plugins: [],
}
