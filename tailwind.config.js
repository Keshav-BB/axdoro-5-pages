/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        axdoro: {
          black: '#111111',       // Primary Dark (Matte Black)
          offwhite: '#F7F5F0',    // Primary Light (Warm Off-White)
          gold: '#C9A96E',        // Accent 1 (Muted Gold)
          beige: '#D8C7B5',       // Accent 2 (Warm Beige)
          slate: '#5F6368',       // Secondary Text
          border: '#E2DED6',      // Soft Grey Border
          success: '#2E7D32',     // Deep Green
          error: '#B3261E',       // Deep Red
          charcoal: '#1A1A1A',
          card: '#FFFFFF',
          cream: '#FAF8F5'
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(17, 17, 17, 0.08)',
        'modal': '0 25px 50px -12px rgba(17, 17, 17, 0.25)',
      }
    },
  },
  plugins: [],
}
