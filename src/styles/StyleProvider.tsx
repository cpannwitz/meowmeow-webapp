import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyles from './globalStyles'

const StyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default StyleProvider
