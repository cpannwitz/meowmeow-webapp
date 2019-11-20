import React from 'react'
import styled from 'styled-components'
import LoadingSpinner from './LoadingSpinner'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingView: React.FC = () => {
  return (
    <Container>
      <LoadingSpinner></LoadingSpinner>
    </Container>
  )
}

export default LoadingView
