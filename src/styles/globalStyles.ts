import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *:after, *:before {
    box-sizing: border-box;
  }

  html {
  font-size: ${p => p.theme.base.fontSize}px;
  line-height: ${p => p.theme.base.lineHeight};
  font-weight: ${p => p.theme.base.fontWeight};
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  @media screen and (max-width: ${p => p.theme.breakpoints[1]}) {
    font-size: $base_font-size * 0.9;
    line-height: $base_line-height * 0.9;
  }
  @media screen and (max-width: ${p => p.theme.breakpoints[0]}) {
    font-size: $base_font-size * 0.8;
    line-height: $base_line-height * 0.8;
  }
}

  body {
    font-family: ${p => p.theme.fonts.main};
    background-image: linear-gradient(0deg, ${p => p.theme.palette.blue.main} , ${p =>
  p.theme.palette.blue.light});
    width: 100vw;
    overflow: hidden;
    margin: 0;
    padding: 0;
    color: ${p => p.theme.palette.white.main} ;
  }


  #root {
  height: 100%;
  width: 100%;
}

  .modal-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  overflow: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  background-color: #4E77E2;
  -webkit-overflow-scrolling: touch;
  border-radius: 4px;
  outline: none;
  padding: 2rem; }

.modal-popup-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${p => p.theme.palette.black.trans}  }


`

export default GlobalStyles
