import React from 'react'
import { useHistory } from 'react-router-dom'

import fb from 'firebase/app'
import { Button } from '../styles/styledComponents'
import { initUser } from '../services/api'

interface AuthButtonProps {
  provider: fb.auth.AuthProvider
  icon: string
  label: string
}
const AuthButton: React.FC<AuthButtonProps> = ({ provider, icon, label }: AuthButtonProps) => {
  const history = useHistory()

  async function handleLogin() {
    const result = await fb.auth().signInWithPopup(provider)
    const user = result.user

    if (user) {
      await initUser()

      if (user.displayName) {
        return history.push('/dashboard')
      }
      return history.push('/welcome')
    } else {
      throw new Error('Couldn"t sign in.')
    }
  }

  return (
    <Button onClick={handleLogin}>
      <img src={icon} alt="logout-icon" />
      {label}
    </Button>
  )
}

export default AuthButton
