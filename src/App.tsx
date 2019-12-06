import React from 'react'
import StyleProvider from './styles/StyleProvider'

import { UserContext as Auth, useAuth } from './services/firebase'
import { updateOnlineStatus } from './services/presenceSystem'
import { useFullScreenSize } from './services/hooks'

import Routes from './Routes'
import NotificationProvider from './components/NotificationSystem'
import ErrorHandler from './components/ErrorHandler'
import LoadingView from './components/LoadingView'

const App = () => {
  useFullScreenSize()

  const { initializing, user } = useAuth()
  if (initializing) return <LoadingView></LoadingView>

  updateOnlineStatus()

  return (
    <ErrorHandler>
      <StyleProvider>
        <Auth.Provider value={{ user }}>
          <Routes />
          <NotificationProvider />
        </Auth.Provider>
      </StyleProvider>
    </ErrorHandler>
  )
}

export default App
