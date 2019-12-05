import React from 'react'
import styled from 'styled-components'
import cats from '../assets/cuty_cats.svg'

import {
  Fullscreen,
  FullscreenHeader,
  Title,
  Subtitle,
  CutyCatsWrap,
  CutyCats,
} from '../StyleComponents'
import AuthButton from './AuthButton'

const Home: React.FC = () => {
  return (
    <Fullscreen>
      <FullscreenHeader>
        <Title>MeowMeow</Title>
        <CutyCatsWrap>
          <CutyCats src={cats} alt="logo" />
        </CutyCatsWrap>
      </FullscreenHeader>
      <Subtitle>Cards for friends.</Subtitle>

      <Container column flat small>
        <AuthButton variant="google"></AuthButton>
        <AuthButton variant="facebook"></AuthButton>
        <AuthButton variant="twitter"></AuthButton>
        <AuthButton variant="github"></AuthButton>
      </Container>
    </Fullscreen>
  )
}

export default Home

const Container = styled.div<any>`
  width: 100%;
  max-width: ${props => (props.small ? '66%' : '100%')};
  height: ${props => (props.flat ? 'auto' : '100%')};
  flex: ${props => (props.flat ? '0 0 auto' : '1 1 auto')};
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  justify-content: ${props => (props.justified ? props.justified : 'center')};
  align-items: ${props => (props.aligned ? props.aligned : 'center')};
  position: relative;
`
