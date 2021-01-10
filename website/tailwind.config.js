const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors,
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
  // xwind options
  xwind: {
    mode: 'objectstyles',
  },
}
