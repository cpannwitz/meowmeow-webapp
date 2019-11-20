import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    base: {
      fontSize: number
      lineHeight: number
      fontWeight: number
    }
    fonts: {
      main: string
      alt: string
    }
    palette: {
      blue: {
        darkest: string
        dark: string
        main: string
        light: string
        lightest: string
      }
      white: {
        off: string
        main: string
        trans: string
      }
      black: {
        off: string
        main: string
        trans: string
      }
      error: string
      success: string
      warn: string
      trans: string
    }
    breakpoints: string[]
    radii: string[]
    shadows: string[]
    transitions: string[]
  }
}
