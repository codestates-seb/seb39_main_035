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
  @font-face {
  font-family: 'RIDIBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Cafe24Ssurround';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  // color 변수 설정
  :root {
    --light-blue: #A8D1E7;
    --scandal: #B3DBD8;
    --clear-day: #EFF7F6;
    --misty-rose: #FEE5E0;
    --pink: #FFBFC5;
    --gray: #747474;
  }

  *{
    box-sizing: border-box;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  *::-webkit-scrollbar {
  display: none;
  }

  body {
    font-family: 'Pretendard-Regular';
    max-width: 40rem;
    margin: 0 auto;
    padding-bottom: 0px;
    min-height: 100vh;
    overflow: scroll;
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.font};
  }
  `;
export default GlobalStyle;
