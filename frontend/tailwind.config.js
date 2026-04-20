/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-7px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        "float-1": "float 2.8s ease-in-out infinite",
        "float-2": "float 3.2s ease-in-out infinite",
        "float-3": "float 3.6s ease-in-out infinite",
        "float-4": "float 4s ease-in-out infinite",
      },
    },
  },
};
