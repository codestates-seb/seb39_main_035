import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
      </BrowserRouter>
    </>
  );
}

export default App;
