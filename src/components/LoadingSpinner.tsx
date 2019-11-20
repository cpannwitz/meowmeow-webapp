import React from 'react'
import styled, { keyframes } from 'styled-components'

interface LoadingSpinnerProps {
  small?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ small = false }: LoadingSpinnerProps) => {
  return <Spinnerbox small={small}></Spinnerbox>
}

export default LoadingSpinner

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinnerbox = styled.div<LoadingSpinnerProps>`
  width: ${p => (p.small ? '2em' : '4em')};
  height: ${p => (p.small ? '2em' : '4em')};
  align-self: center;
  font-size: 10px;
  position: relative;
  border-radius: 50%;
  text-indent: -9999em;
  border: 0.5em solid rgba(255, 255, 255, 0.2);
  border-left: 0.5em solid #ffffff;
  border-width: ${p => (p.small ? '0.3em' : '0.5em')};
  transform: translateZ(0);
  animation: ${spinnerAnimation} 1.1s infinite linear;
`
