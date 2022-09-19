import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
    format('woff');
  font-weight: 400;
  font-style: normal;
  }
  *{
    box-sizing: border-box;
  }
  body {
    background-color: #f9f9f9;
    font-family: 'Pretendard-Regular';
    color: #747474;
    max-width: 640px;
    margin: 0 auto;
    padding-bottom: 0px;
    min-height: 100vh;
  }
  `;
export default GlobalStyle;
