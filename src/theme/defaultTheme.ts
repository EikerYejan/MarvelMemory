import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  borderRadius: '4px',
  colors: {
    black: '#000',
    dark: '#151515',
    white: '#fff',
    red: '#f0141e',
  },
  breakpoints: {
    tablet: {
      min: '(min-width: 768px)',
    },
    desktop: {
      min: '(min-width: 1024px)',
    },
  },
}

export default theme
