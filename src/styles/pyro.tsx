import React from 'react'
import styled, { keyframes } from 'styled-components'

export const PyroShow = () => (
  <PyroWrap>
    <PyroBefore></PyroBefore>
    <PyroAfter></PyroAfter>
  </PyroWrap>
)

const BangFrames = keyframes`
to {
    box-shadow: -90px -355.66667px #91ff00, -239px 70.33333px #ff9100, 78px -260.66667px #5e00ff, 7px -404.66667px #f700ff, -143px -76.66667px #73ff00, -191px -255.66667px #ff00e6, -122px -93.66667px #0080ff, 221px -134.66667px #aeff00, 61px -109.66667px #8800ff, 45px -28.66667px #0077ff, -215px -78.66667px #0026ff, 171px -319.66667px #ff00ae, -23px 28.33333px #ffd900, -72px -295.66667px #00ffa6, 64px 61.33333px #c8ff00, -123px -238.66667px #d5ff00, 13px -71.66667px #4800ff, 101px -396.66667px #ff00dd, -147px -198.66667px #00ff7b, 235px 19.33333px #ffd900, 71px -243.66667px #ff0900, -83px -361.66667px #00eaff, -211px -110.66667px #8800ff, -126px -224.66667px #ff0040, 82px -15.66667px #00ff22, -215px -312.66667px #ff9d00, -60px -160.66667px #ff004d, 34px -223.66667px #ff9100, -58px -87.66667px #ff00bf, -116px -250.66667px #0900ff, 222px -296.66667px #cc00ff, -30px -209.66667px #88ff00, -14px 53.33333px #0011ff, 232px -290.66667px darkorange, -41px -137.66667px #ff002f, 86px -266.66667px #0055ff, 12px -115.66667px #3300ff, 155px -198.66667px #bf00ff, -198px -379.66667px #ff2b00, -23px -403.66667px #ff0073, 160px -367.66667px #ddff00, 69px 72.33333px #ea00ff, -35px -215.66667px #ff00aa, 239px 75.33333px #0095ff, -53px -321.66667px #5900ff, -47px -19.66667px #ff001e, 197px -401.66667px #48ff00, 121px -330.66667px #ffee00, 160px 32.33333px #ff0095, 100px -376.66667px #d000ff, -195px -344.66667px #ff0022;
  }
`

const GravityFrames = keyframes`
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
`

const PositionFrames = keyframes`
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
`

const PyroWrap = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`

const BoxSh = '0 0 #fff'
const PyroBefore = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh},
    ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh},
    ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh},
    ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh},
    ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh},
    ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh}, ${BoxSh};
  animation: 1s ${BangFrames} ease-out infinite backwards,
    1s ${GravityFrames} ease-in infinite backwards, 5s ${PositionFrames} linear infinite backwards;
`

const PyroAfter = styled(PyroBefore)`
  animation-delay: 1.25s, 1.25s, 1.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
`
