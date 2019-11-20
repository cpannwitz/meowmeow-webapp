import { DefaultTheme } from 'styled-components'

const mainTheme: DefaultTheme = {
  base: {
    fontSize: 16,
    lineHeight: 1.6,
    fontWeight: 400,
  },
  fonts: {
    main: '"Quicksand", sans-serif',
    alt: '"Londrina Shadow", sans-serif',
  },
  palette: {
    blue: {
      darkest: '#022B96',
      dark: '#284a9f',
      main: '#345FCC',
      light: '#4E77E2',
      lightest: '#81AAFF',
    },
    white: {
      off: '#E3F2FD',
      main: '#ffffff',
      trans: 'rgba(255,255,255,0.85)',
    },
    black: {
      off: '#363647',
      main: '#272727',
      trans: 'rgba(39,39,39,0.85)',
    },
    error: '#DB5461',
    success: '#5ebf58',
    warn: '#ebad1a',
    trans: 'rgba(255,255,255,0.07)',
  },
  breakpoints: ['400px', '800px'],
  radii: ['4px', '50%', '100%'],
  shadows: ['0 1px 4px #284a9f'],
  transitions: ['all 0.15s ease-in-out'],
}

export default mainTheme
