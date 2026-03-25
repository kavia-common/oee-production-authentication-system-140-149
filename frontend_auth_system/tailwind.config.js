/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          primary: "#2563EB",
          secondary: "#F59E0B",
          success: "#F59E0B",
          error: "#EF4444",
          text: "#111827",
          background: "#f9fafb",
          surface: "#ffffff",
        },
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(17,24,39,0.10), 0 8px 10px -6px rgba(17,24,39,0.10)",
      },
    },
  },
  plugins: [],
};

