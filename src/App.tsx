import React, { useLayoutEffect } from 'react'
import { useWindowSize } from 'react-use'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import Routes from './Routes'
import { UserContext, useAuth } from './services/firebase'
import { updateOnlineStatus } from './services/presenceSystem'
import ErrorHandler from './components/ErrorHandler'
import GlobalStyles from './styles/globalStyles'
import theme from './styles/theme'
import LoadingView from './components/LoadingView'

const App = () => {
  const { height } = useWindowSize()
  const { initializing: loading, user } = useAuth()

  useLayoutEffect(() => {
    document.body.style.height = height + 'px'
  }, [height])

  if (loading) return <LoadingView></LoadingView>
  updateOnlineStatus()
  return (
    <ThemeProvider theme={theme}>
      <ErrorHandler>
        <UserContext.Provider value={{ user }}>
          <Routes />
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={true}
            draggablePercent={60}
          />
          <GlobalStyles />
        </UserContext.Provider>
      </ErrorHandler>
    </ThemeProvider>
  )
}

export default App
