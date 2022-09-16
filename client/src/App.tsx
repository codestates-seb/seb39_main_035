import React from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */

`;
const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding-bottom: 0px;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container></Container>
    </>
  );
}

export default App;
