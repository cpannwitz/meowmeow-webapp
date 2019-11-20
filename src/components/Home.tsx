import React from 'react'
import styled from 'styled-components'
import cats from '../assets/cuty_cats.svg'
import fb from 'firebase/app'

import {
  Fullscreen,
  FullscreenHeader,
  // Container,
  // Section,
  Title,
  Subtitle,
  CutyCatsWrap,
  CutyCats,
  // FilterBar,
  // FilterLink,
} from '../StyleComponents'
import AuthButton from './AuthButton'
import { useToggleState } from '../services/hooks'
import AuthInput from './AuthInput'
// import { useHistory } from 'react-router'
// import { useSession } from '../services/firebase'

const Home = () => {
  // const history = useHistory()
  const [viewSwitched, toggleViewSwitched] = useToggleState(false)
  // const user = useSession()

  // if (user) {
  //   history.push('/dashboard')
  // }
  return (
    <Fullscreen>
      <FullscreenHeader>
        <Title>MeowMeow</Title>
        <CutyCatsWrap>
          <CutyCats src={cats} alt="cuty_cats" />
        </CutyCatsWrap>
      </FullscreenHeader>
      <Subtitle>Cards for friends.</Subtitle>

      <Container column flat small>
        <AuthButton
          icon="https://icongr.am/simple/facebook.svg?size=20&color=ffffff"
          label="Facebook-Login"
          provider={new fb.auth.FacebookAuthProvider()}
        ></AuthButton>
        <AuthButton
          icon="https://icongr.am/simple/google.svg?size=20&colored=true"
          label="Google-Login"
          provider={new fb.auth.GoogleAuthProvider()}
        ></AuthButton>
      </Container>

      <Section column nowrap nopad>
        <FilterBar justified={'space-around'} flat>
          <FilterLink active={!viewSwitched} onClick={() => toggleViewSwitched()}>
            Login
          </FilterLink>
          <FilterLink active={viewSwitched} onClick={() => toggleViewSwitched()}>
            SignUp
          </FilterLink>
        </FilterBar>

        <Container column>
          {!viewSwitched ? (
            <AuthInput variant="signin" label="Login" />
          ) : (
            <AuthInput variant="signup" label="SignUp" />
          )}
        </Container>
      </Section>
    </Fullscreen>
  )
}

export default Home

const COLOR = {
  blue_darkest: '#022B96',
  blue_dark: '#284a9f',
  blue_mid: '#345FCC',
  blue_light: '#4E77E2',
  blue_lightest: '#81AAFF',
  snow: '#E3F2FD',
  white: '#fff',
  white_st: 'rgba(255,255,255,0.85)',
  black: '#272727',
  black_st: 'rgba(39,39,39,0.85)',
  red: '#DB5461',
  green: '#5ebf58',
  transp: 'rgba(255,255,255,0.07)',
}

export const Container = styled.div<any>`
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

export const Section = styled.div<any>`
  width: 96%;
  flex: ${props => (props.flat ? '0 0 auto' : '1 1 auto')};
  overflow-y: auto;
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  flex-wrap: ${props => (props.nowrap ? 'nowrap' : 'wrap')};
  justify-content: ${props => (props.spread ? 'space-between' : 'flex-start')};
  align-items: center;
  margin: 1rem auto;
  padding: ${props => (props.nopad ? '0rem' : '1rem')};
  padding-top: ${props => props.padtop && '2rem'};
  border-radius: 4px;
  background-color: ${COLOR.transp};
  border: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
`
export const FilterBar = styled.div<any>`
  height: 2rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${COLOR.blue_light};
`

export const FilterLink = styled.div<any>`
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: ${props => (props.active ? '' : COLOR.blue_mid)};
  cursor: pointer;
  z-index: 1;
`
