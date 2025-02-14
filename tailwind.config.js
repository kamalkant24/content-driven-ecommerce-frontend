/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '0px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1536px',
      },
      colors: {
        primaryColor: '#27445D',
        secondaryColor: '#1976d2',
        backdropColor: '#0000004a'
      }
    },
  },
  plugins: [],
}

