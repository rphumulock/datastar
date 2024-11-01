/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    // '../**/*.md',
    '../**/*.templ',
    '../**/*.go'
  ],
  theme: {
    extend: {
      colors: {
        background: '#383838',
        primary: '#00dd00',
        secondary: '#ffffff',
        hover: '#ff0000',
        overlay: 'rgba(16, 16, 16, 0.2)',
      },
      fontFamily: {
        sans: ['VT323', ...fontFamily.sans],
      },
      fontSize: {
        'base': '1.4em',
      },
      keyframes: {
        scroll: {
          '0%': { height: '0' },
          '100%': { height: '100%' },
        },
        type: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        flicker: {
          '0%': { opacity: '0.15795' },
          '5%': { opacity: '0.31511' },
          '10%': { opacity: '0.94554' },
          // Add all keyframes for the flicker effect
          '100%': { opacity: '0.54813' },
        },
      },
      animation: {
        scroll: 'scroll 5s forwards',
        type: 'type 2s steps(20, end)',
        flicker: 'flicker 0.3s infinite',
      },
      spacing: {
        'container': '40px',
      },
      screens: {
        'overlay': { max: '600px' },
      },
    },
  },
  plugins: [
    function ({ addBase, addUtilities, addComponents }) {
      addBase({
        'html, body': {
          backgroundColor: '#383838',
          color: '#00dd00',
          fontSize: '64.5%',
          fontFamily: '"Press Start 2P", Courier, monospace',
          height: '100%',
          margin: '0',
          padding: '0',
        },
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: 'normal',
          margin: '0',
          textTransform: 'uppercase',
        },
        'a': {
          color: '#ffffff',
          textDecoration: 'none',
        },
        'a:hover': {
          color: '#ff0000',
        },
        'ul': {
          listStyle: 'none',
        },
        'p, span': {
          lineHeight: '100%',
          margin: '0',
        },
        'span': {
          animation: 'blink 1s infinite',
        },
        '::-webkit-scrollbar': { display: 'none' },
      });

      addUtilities({
        '.overlay': {
          height: '1px',
          position: 'absolute',
          width: '1px',
          top: '0',
          left: '0',
        },
        '.overlay::before': {
          background:
            'linear-gradient(#101010 50%, rgba(16, 16, 16, 0.2) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.03))',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          position: 'fixed',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          zIndex: '2',
        },
        '.overlay::after': {
          animation: 'flicker 0.3s infinite',
          background: 'rgba(16, 16, 16, 0.2)',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          position: 'fixed',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          zIndex: '2',
        },
        '.scanline': {
          animation: 'scroll 10s infinite',
          background:
            'linear-gradient(to bottom, rgba(0, 221, 0, 0) 0%, rgba(0, 221, 0, 1) 50%, rgba(0, 221, 0, 0) 100%)',
          display: 'block',
          height: '20px',
          opacity: '0.05',
          position: 'absolute',
          left: '0',
          right: '0',
          top: '-5%',
          zIndex: '2',
        },
      });
    },
  ],
}
