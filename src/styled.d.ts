import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    colors: {
      black: string
      dark: string
      white: string
      red: string
    }
    breakpoints: {
      tablet: {
        min: string
      }
      desktop: {
        min: string
      }
    }
  }
}
