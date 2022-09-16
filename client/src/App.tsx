import React from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  // color 변수 설정
  :root {
    --light-blue: #A8D1E7;
    --scandal: #B3DBD8;
    --clear-day: #EFF7F6;
    --misty-rose: #FEE5E0;
    --pink: #FFBFC5;
  }

  // font 변수 설정
@font-face {
  font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
@font-face {
  font-family: 'RIDIBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
`;
const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding-bottom: 0px;
  min-height: 100vh;
  background-color: var(--clear-day);
  position: relative;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Container>
          <Routes>
            <Route path='/' element={<Landing />}></Route>
            <Route path='/members/sign-in' element={<SignIn />}></Route>
            <Route path='/members/sign-up' element={<SignUp />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
