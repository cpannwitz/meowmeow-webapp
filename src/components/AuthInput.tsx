import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import fb from 'firebase/app'
import { Button, Input } from '../styles/styledComponents'
import { initUser } from '../services/api'

interface AuthInputProps {
  variant: 'signup' | 'signin'
  label: string
}
const AuthInput: React.FC<AuthInputProps> = ({ variant, label }: AuthInputProps) => {
  const history = useHistory()

  const [emailState, setEmailState] = useState('')
  const [passwordState, setPasswordState] = useState('')

  async function onSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const result = await fb.auth().createUserWithEmailAndPassword(emailState, passwordState)
    const user = result.user

    await initUser()
    if (user) {
      if (user.displayName) {
        return history.push('/dashboard')
      }
      return history.push('/welcome')
    } else {
      throw new Error('Couldn"t sign in.')
    }
  }

  async function onSignIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const result = await fb.auth().signInWithEmailAndPassword(emailState, passwordState)
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
    <Container>
      <Input
        type="text"
        value={emailState}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailState(e.target.value)}
        placeholder="E-Mail"
      />
      <Input
        type="password"
        value={passwordState}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordState(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit" onClick={variant === 'signin' ? onSignIn : onSignUp}>
        {label}
      </Button>
    </Container>
  )
}

export default AuthInput

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 1rem;
`
