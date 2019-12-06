import React from 'react'
import { useHistory } from 'react-router-dom'

import fb from 'firebase/app'
import { Button } from '../styles/styledComponents'
import { initUser } from '../services/api'
import { authVariants } from '../configs/authVariants'

interface AuthButtonProps {
  variant: keyof typeof authVariants
}
const AuthButton: React.FC<AuthButtonProps> = ({ variant }: AuthButtonProps) => {
  const history = useHistory()

  const data = authVariants[variant]

  async function handleLogin() {
    const result = await fb.auth().signInWithPopup(data.provider)
    const user = result.user

    if (user) {
      await initUser()

      if (result.additionalUserInfo?.isNewUser) {
        return history.push('/welcome')
      }
      return history.push('/dashboard')
    } else {
      throw new Error('Couldn"t sign in.')
    }
  }

  return (
    <Button onClick={handleLogin}>
      <img src={data.icon} alt="logout-icon" />
      {data.label}
    </Button>
  )
}

export default AuthButton
