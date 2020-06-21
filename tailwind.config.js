module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      purple: '#050066',
      orange: '#FF6A5B',
      tan: '#F6F5EF',
    },
    stroke: theme => ({
      'purple-black': theme('colors.purple.black'),
      'pink': theme('colors.pink'),
    }),
    fontFamily: {
      body: ['Encode Sans', 'sans-serif'],
      display: ['Encode Sans Condensed', 'sans-serif'],
      expanded: ['Encode Sans Expanded', 'sans-serif'],
    },
    extend: {
      colors: {
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
        }
      }
    }
  },
  variants: {},
  plugins: []
}
