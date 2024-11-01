/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // '../**/*.md',
    '../**/*.templ',
    '../**/*.go'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Press Start 2P"'],  // Set as default font
      },
      colors: {
        background: '#000000',      // Classic black background
        'primary': '#00FF00',  // Neon green for primary text
        'secondary': '#FFFFFF',// Bright white for secondary text
        'accent-1': '#FF0000',      // Red accent color for important buttons
        'accent-2': '#00BFFF',      // Blue accent for secondary elements
        'accent-3': '#FFD700',      // Gold for special elements or icons
        'hover-primary': '#008000', // Darker green for hover states on text
        'hover-accent-1': '#B22222' // Dark red hover for critical actions
      },
      backgroundColor: {
        screen: '#111111',          // Dark background screen color for sections
        'screen-highlight': '#222222', // Lighter dark for containers or headers
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'body, body *': {
          cursor: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221.2rem%22 height=%221.2rem%22 viewBox=%220 0 24 24%22%3E%3Cpath fill=%22none%22 stroke=%22%2300ff00%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M11 21L4 4l17 7l-6.265 2.685a2 2 0 0 0-1.05 1.05z%22/%3E%3C/svg%3E") 14 14, auto',
        },
        'body:hover, body *:hover': {
          cursor: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221.2rem%22 height=%221.2rem%22 viewBox=%220 0 24 24%22%3E%3Cpath fill=%22%2300ff00%22 fill-rule=%22evenodd%22 d=%22M4.38 3.075a1 1 0 0 0-1.305 1.306l7 17a1 1 0 0 0 1.844.013l2.685-6.265a1 1 0 0 1 .525-.525l6.265-2.685a1 1 0 0 0-.013-1.844z%22 clip-rule=%22evenodd%22/%3E%3C/svg%3E") 12 12, auto',
        }
      });
    },
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar'),
  ],
}
