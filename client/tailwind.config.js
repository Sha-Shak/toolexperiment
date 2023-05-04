/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        custoDark: {
          "primary": "#7e22ce",
          "secondary": "#3730a3",
          "accent": "#0d9488",
          "neutral": "#191D24",
          "base-100": "#2A303C",
          "info": "#0284c7",
          "success": "#10b981",
          "warning": "#FBBD23",
          "error": "#e11d48",
        },
      },
      {
        customLight: {
          "primary": "#c084fc",
          "secondary": "#3b82f6",
          "accent": "#1FB2A5",
          "neutral": "#191D24",
          "base-100": "#f5f5f4",
          "info": "#0284c7",
          "success": "#10b981",
          "warning": "#FBBD23",       
          "error": "#fb7185",
        }
      }
    ],
  },
}

