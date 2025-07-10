/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Entry HTML
    "./src/**/*.{js,jsx,ts,tsx}", // All components and pages
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",   // Example: custom blue
        secondary: "#F59E0B", // Example: amber
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Customize if needed
      },
    },
  },
  plugins: [],
};
