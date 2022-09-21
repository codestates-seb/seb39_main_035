import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import Landing from './pages/Landing';
import Library from './pages/Library';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SearchBooks from './pages/SearchBooks';
import SearchBook from './pages/SearchBook';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/members/sign-in' element={<SignIn />}></Route>
          <Route path='/members/sign-up' element={<SignUp />}></Route>
          <Route path='/books/search' element={<SearchBooks />}></Route>
          <Route path='/books/search/:id' element={<SearchBook />}></Route>
          <Route path='/books/library' element={<Library />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
