import styled, { keyframes } from 'styled-components'
import { NavLink } from 'react-router-dom'
import catsprite from './assets/catsprite.png'

/* ====================================================
   ===================== VARIABLES ====================
   ==================================================== */
const GLOBAL = {
  font: '"Quicksand", sans-serif',
  altfont: '"Londrina Shadow", "Nunito Sans", sans-serif',
}

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

/* ====================================================
   ================ NOTIFICATIONS STYLE ===============
   ==================================================== */
const defaultColors = {
  white: COLOR.white,
  success: {
    hex: COLOR.green,
  },
  error: {
    hex: COLOR.red,
  },
  warning: {
    hex: '#ebad1a',
  },
  info: {
    hex: COLOR.blue_light,
  },
}

export const notificationStyles = {
  NotificationItem: {
    success: {
      borderTop: '2px solid ' + defaultColors.success.hex,
      backgroundColor: defaultColors.success.hex,
      color: defaultColors.white,
      WebkitBoxShadow: '0 0 12px ' + COLOR.black_st,
      MozBoxShadow: '0 0 12px ' + COLOR.black_st,
      boxShadow: '0 0 12px ' + COLOR.black_st,
    },

    error: {
      borderTop: '2px solid ' + defaultColors.error.hex,
      backgroundColor: defaultColors.error.hex,
      color: defaultColors.white,
      WebkitBoxShadow: '0 0 12px ' + COLOR.black_st,
      MozBoxShadow: '0 0 12px ' + COLOR.black_st,
      boxShadow: '0 0 12px ' + COLOR.black_st,
    },

    warning: {
      borderTop: '2px solid ' + defaultColors.warning.hex,
      backgroundColor: defaultColors.warning.hex,
      color: defaultColors.white,
      WebkitBoxShadow: '0 0 12px ' + COLOR.black_st,
      MozBoxShadow: '0 0 12px ' + COLOR.black_st,
      boxShadow: '0 0 12px ' + COLOR.black_st,
    },

    info: {
      borderTop: '2px solid ' + defaultColors.info.hex,
      backgroundColor: defaultColors.info.hex,
      color: defaultColors.white,
      WebkitBoxShadow: '0 0 12px ' + COLOR.black_st,
      MozBoxShadow: '0 0 12px ' + COLOR.black_st,
      boxShadow: '0 0 12px ' + COLOR.black_st,
    },
  },

  Title: {
    DefaultStyle: {
      fontSize: '14px',
      margin: '0 0 5px 0',
      padding: 0,
      fontWeight: 'bold',
    },

    success: {
      color: defaultColors.white,
    },

    error: {
      color: defaultColors.white,
    },

    warning: {
      color: defaultColors.white,
    },

    info: {
      color: defaultColors.white,
    },
  },
  Dismiss: {
    DefaultStyle: {
      fontFamily: 'Arial',
      fontSize: '17px',
      position: 'absolute',
      top: '4px',
      right: '5px',
      lineHeight: '15px',
      backgroundColor: COLOR.black_st,
      color: COLOR.white,
      borderRadius: '50%',
      width: '14px',
      height: '14px',
      fontWeight: 'bold',
      textAlign: 'center',
    },

    success: {
      backgroundColor: COLOR.black_st,
      color: COLOR.white,
    },

    error: {
      backgroundColor: COLOR.black_st,
      color: COLOR.white,
    },

    warning: {
      backgroundColor: COLOR.black_st,
      color: COLOR.white,
    },

    info: {
      backgroundColor: COLOR.black_st,
      color: COLOR.white,
    },
  },
}

/* ====================================================
   ================ STYLED COMPONENTS =================
   ==================================================== */

export const XXX = styled.div`
  width: inherit;
  /* TODO: sure? */
  width: 100%;
  height: inherit;
`

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinnerbox = styled.div`
  width: ${props => (props.small ? '2em' : '4em')};
  height: ${props => (props.small ? '2em' : '4em')};
  align-self: center;
  font-size: 10px;
  position: relative;
  border-radius: 50%;
  text-indent: -9999em;
  border: 0.5em solid rgba(255, 255, 255, 0.2);
  border-left: 0.5em solid #ffffff;
  border-width: ${props => (props.small ? '0.3em' : '0.5em')};
  transform: translateZ(0);
  animation: ${spinnerAnimation} 1.1s infinite linear;
`

export const Section = styled.div`
  width: 96%;
  flex: ${props => (props.flat ? '0 0 auto' : '1 1 auto')};
  overflow-y: auto;
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  flex-wrap: ${props => (props.nowrap ? 'nowrap' : 'wrap')};
  justify-content: ${props => (props.spread ? 'space-between' : `flex-start`)};
  align-items: center;
  margin: 1rem auto;
  padding: ${props => (props.nopad ? '0rem' : '1rem')};
  padding-top: ${props => props.padtop && '2rem'};
  border-radius: 4px;
  background-color: ${COLOR.transp};
  border: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
`

export const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  padding: ${props => (props.spread ? '3.5rem 0 0rem 0' : '3.5rem 0')};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: ${props => (props.spread ? 'space-between' : 'flex-start')};
  align-items: center;
`

export const FullscreenHeader = styled.div`
  max-height: 10vh;
  flex: 0 0 10vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
`

export const Container = styled.div`
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

export const NavbarBar = styled.div`
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.blue_mid};

  /* & > * {
  flex: 1 1 auto;
} */

  @media screen and (max-width: 550px) {
    height: 3.5rem;
  }
`

export const NavbarBarButton = styled.div`
  flex: 0 1 100%;
  /* max-width: 70%; */

  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  color: ${COLOR.white};
  font-weight: bold;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-shadow: none;

  &:active,
  &:hover {
    outline: none;
    background-color: ${COLOR.blue_light};
  }

  & > img:not(:only-child) {
    margin-right: 0.5rem;
  }
`

export const NavbarButtonSmall = styled(NavbarBarButton)`
  flex: 0 0 15%;
`

export const NavbarLink = styled(NavLink)`
  flex: 0 1 100%;

  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  color: ${COLOR.white};
  font-weight: bold;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-shadow: none;

  &.active,
  &:active,
  &:hover {
    outline: none;
    background-color: ${COLOR.blue_light};
  }

  & > img:not(:only-child) {
    margin-right: 0.5rem;
  }
`

export const MatchStatus = styled.div`
  flex: 0 1 100%;
  max-width: 70%;

  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  color: ${COLOR.white};
  font-weight: bold;
  text-decoration: none;
  background-color: ${props => (props.positive ? COLOR.green : COLOR.red)};
  & > *:first-child {
    margin-right: 0.5rem;
  }
`

export const StyledList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  padding: 0.5rem;
  list-style: none;

  ${Spinnerbox} {
    margin: 0.3rem 0;
  }
`

export const ListItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 0.75rem;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background-color: ${props =>
    !props.notFinished && props.news ? COLOR.red : 'rgba(255, 255 ,255, 0.1)'};
`

export const ListItemIndex = styled.span`
  margin-right: 0.5rem;
`

export const FilterBar = styled.div`
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

export const FilterLink = styled.span`
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
`

export const Title = styled.h1`
  font-size: 3.8rem;
  line-height: 3rem;
  text-shadow: 0 0 15px ${COLOR.blue_lightest};
  letter-spacing: -0.4rem;
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding: 0;
  flex: 0 1 75%;
  color: ${props => (props.inverted ? COLOR.black : COLOR.white)};
  font-family: ${props => (props.altfont ? GLOBAL.altfont : GLOBAL.font)};
`

export const TitleSmall = styled.h2`
  font-size: 2rem;
  line-height: 1.8rem;
  text-shadow: 0 0 5px ${COLOR.blue_lightest};
  letter-spacing: -0.05rem;
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding: 0;
  flex: 1 1 auto;
  color: ${props => (props.inverted ? COLOR.black : COLOR.white)};
  font-family: ${props => (props.altfont ? GLOBAL.altfont : GLOBAL.font)};
`

export const Subtitle = styled.h3`
  font-size: 1.4rem;
  line-height: 1.4rem;
  text-shadow: 0 0 3px ${COLOR.blue_lightest};
  letter-spacing: -0.05rem;
  text-align: center;
  font-weight: bold;
  margin: 1rem;
  padding: 0;
  flex: 1 1 auto;
  color: ${props => (props.inverted ? COLOR.black : COLOR.white)};
  font-family: ${props => (props.altfont ? GLOBAL.altfont : GLOBAL.font)};
`

export const SubtitleSmall = styled.h4`
  font-size: 1.2rem;
  line-height: 1.4rem;
  text-shadow: 0 0 3px ${COLOR.blue_lightest};
  letter-spacing: -0.02rem;
  text-align: center;
  font-weight: bold;
  margin: 0.5rem;
  padding: 0;
  flex: 1 1 auto;
  color: ${props => (props.inverted ? COLOR.black : COLOR.white)};
  font-family: ${props => (props.altfont ? GLOBAL.altfont : GLOBAL.font)};
  ${props =>
    props.truncated &&
    `
  flex: 0 1 45%;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`}
`

export const Capitalized = styled.span`
  text-transform: capitalize;
`

export const Bolded = styled.span`
  font-weight: bold;
`

export const Smalltext = styled.span`
  font-size: 80%;
`

export const Truncated = styled.span`
  max-width: ${props => (props.short ? '25%' : '45%')};
  flex: 0 0 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${props => (props.centered ? 'center' : '')};
`

export const CutyCatsWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex: 0 1 20%;
`

export const CutyCats = styled.img`
  width: 100%;
  max-width: 10rem;
`

export const SingleButton = styled.button`
  width: 100%;
  min-height: 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2rem;
  margin: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${COLOR.white};
  border: 1px solid ${COLOR.blue_light};
  border-radius: 4px;
  background-color: ${COLOR.blue_mid};
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:active,
  &:hover,
  &:focus {
    background-color: ${COLOR.blue_dark};
    outline: none;
  }
  &:only-of-type {
    margin: 0.5rem auto;
  }

  & > * {
    margin: 0 0.5rem;
  }

  &:disabled {
    color: ${COLOR.white};
    background-color: rgba(255, 255, 255, 0.35);
  }
`

export const SmallButton = styled(SingleButton)`
  width: 48%;
  display: inline-flex;
  padding: 0.5rem 0.5rem;
  vertical-align: middle;
`

export const InlineButton = styled(SingleButton)`
  width: auto;
  flex: 0 0 auto;
  display: inline-flex;
  padding: 0.5rem 0.8rem;
  margin: 0;
  &:only-of-type {
    margin: 0;
  }
  & > * {
    margin: 0 0.3rem;
  }
  margin-left: 0.3rem !important;
`

export const Label = styled.span`
  align-self: ${props => (props.centered ? 'center' : 'flex-start')};
  font-size: 0.8rem;
  font-weight: bold;
  color: #fdf4e3;
  text-shadow: 0 0 3px #fdf4e3;
`

export const Inputfield = styled.input`
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${COLOR.blue_light};
  background-color: ${COLOR.snow};
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  color: #272727;
  transition: all 0.15s ease-in-out;

  &:focus,
  &:active,
  &:hover {
    outline: none;
    background-color: ${COLOR.white};
  }
`

export const BigInputfield = styled(Inputfield)`
  font-size: 1.6rem;
`

export const AvatarWrap = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
  border-radius: 100%;
  border: 4px solid ${COLOR.blue_mid};
  background-color: ${COLOR.white};
  overflow: hidden;
`

export const AvatarWrapSmall = styled(AvatarWrap)`
  width: 2.8rem;
  height: 2.8rem;
  border: 3px solid ${COLOR.blue_mid};
`

export const InnerImage = styled.img`
  height: 110%;
  width: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 55%;
  transform: translateX(-55%);
`

export const UserbadgeStyled = styled(Section)`
  flex: 0 0 4rem;
  justify-content: space-between;
  padding: 0.5rem;
  padding-right: 1rem;
  border-radius: 45px;
  cursor: pointer;
`

export const SubNav = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3rem;
  background-color: ${COLOR.blue_mid};
  border-top: 1px solid ${COLOR.blue_light};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  @media screen and (max-width: 550px) {
    height: 3.5rem;
  }
`

export const SubNavButton = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  height: 3rem;
  line-height: 3rem;
  flex: 1 1 auto;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  background-color: ${props => (props.viewSwitched ? COLOR.blue_light : 'transparent')};
  border-top: 1px solid ${COLOR.blue_light};
  cursor: pointer;
  text-shadow: none;

  & > img {
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 550px) {
    height: 3.5rem;
    line-height: 3rem;
  }
`

export const ModalCloseBtn = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  border-radius: 100%;
  background: url('https://icongr.am/feather/x.svg?size=24&color=333333');
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    transform: rotate(180deg);
  }
`

export const JackWishColor = styled.img`
  width: 5rem;
  flex: 1 1 25%;
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  filter: drop-shadow(0 0 3px ${COLOR.blue_dark});
  &:hover,
  &:active,
  &:focus {
    outline: none;
    opacity: 1;
  }
`

export const DeckArea = styled(Section)`
  max-height: 32vh;
  overflow-y: ${props => (props.noScroll ? 'hidden' : 'auto')};
  justify-content: center;
`

export const OpponentArea = styled(Container)`
  max-height: 12vh;
  align-items: flex-start;
`

export const CardBatch = styled.div`
  width: 50vw;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`

export const Overlay = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.blue_darkest};
  opacity: 0.5;
`

export const DeckImageWrap = styled.div`
  width: 20vw;
  max-width: 6rem;
  height: 30vw;
  max-height: 9rem;

  transform: ${props => (props.chosen ? 'scale(1.03) translateY(-0.5rem)' : '')};
  filter: ${props => (props.notChosen ? 'opacity(0.5)' : '')};

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  transform-origin: bottom;
  transition: all 0.15s ease-in-out;
  margin: 1rem 0.5rem 0 0.5rem;
  box-shadow: 0 0 3px ${COLOR.blue_dark};
`

export const BatchImageWrap = styled.div`
  width: 18vw;
  max-width: 7rem;
  height: 27vw;
  max-height: 10rem;

  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  transform-origin: bottom;
  transition: all 0.15s ease-in-out;
  filter: drop-shadow(0 0 3px ${COLOR.blue_dark});
`

export const ImageWrapStack = styled(BatchImageWrap)`
  filter: drop-shadow(1px 1px 0 ${COLOR.black_st}) drop-shadow(1px 1px 0 ${COLOR.white})
    drop-shadow(1px 1px 0 ${COLOR.black_st}) drop-shadow(1px 1px 0 ${COLOR.white})
    drop-shadow(1px 1px 0 ${COLOR.black_st});
  box-shadow: none;
`

export const OpponentImageWrap = styled.div`
  width: 12vw;
  max-width: 4rem;
  height: 18vw;
  max-height: 6rem;

  margin: 0 -1.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
  transform-origin: bottom;
  transition: all 0.15s ease-in-out;
`

export const LastActionsLine = styled(Section)`
  height: 2rem;
  padding: 0 1rem;
  margin: 0.5rem auto;
`

const walkCycle = keyframes`
  0% { background-position: 0 0; }
  100% {background-position: 0 -2391px; }
`

const sitDown = keyframes`
  0% { background-position: -400px 0; }
  100% {background-position: -400px -1000px; }
`

export const CattyDiv = styled.div`
  background: url(${catsprite}) 0 0 no-repeat;
  height: 200px;
  width: 100%;
  max-width: 400px;
  transform: scale(0.5);
  animation: ${walkCycle} 1s steps(12) 4, ${sitDown} 0.5s steps(5) 4s 1;
  animation-fill-mode: forwards;
`
