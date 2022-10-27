import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import PrivateRoute from './router/PrivateRoute';
import GlobalStyle from './GlobalStyle';
import Landing from './pages/Landing';
import Library from './pages/Library';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BookDetail from './pages/BookDetail';
import SearchBooks from './pages/SearchBooks';
import SearchBook from './pages/SearchBook';
import Mypage from './pages/MyPage';
import MyStat from './pages/MyStat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecommendBooksList from './pages/RecommendBooksList';
import MemoForm from './pages/MemoForm';
import RegisterBook from './pages/RegisterBook';
import MemoBooks from './pages/MemoBooks';
import BookMemoDetail from './pages/BookMemoDetail';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './stores/store';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { setDefaultTheme, setDarkTheme } from './stores/themeSlice';
import darkMode from './assets/dark_mode.png';
import lightMode from './assets/light_mode.png';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme);

  const setDark = () => {
    dispatch(setDarkTheme());
  };

  const setDefault = () => {
    dispatch(setDefaultTheme());
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/members/sign-in' element={<SignIn />} />
          <Route path='/members/sign-up' element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path='/books/search' element={<SearchBooks />} />
            <Route path='/books/search/:id' element={<SearchBook />} />
            <Route path='/books/register' element={<RegisterBook />} />
            <Route path='/books/library' element={<Library />} />
            <Route path='/books/library/:id' element={<BookDetail />} />
            <Route path='/books/recommend' element={<RecommendBooksList />} />
            <Route path='/mystat' element={<MyStat />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/memo' element={<MemoForm />} />
            <Route path='/memo/:id' element={<MemoForm />} />
            <Route path='/books/memoBooks' element={<MemoBooks />} />
            <Route path='/books/:id/memos' element={<BookMemoDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {!theme.darkmode ? (
        <ModeButton onClick={setDark} type='button'>
          <img src={darkMode} alt='' />
        </ModeButton>
      ) : (
        <ModeButton onClick={setDefault} type='button'>
          <img src={lightMode} alt='' />
        </ModeButton>
      )}
      <ToastContainer position='top-center' pauseOnFocusLoss theme='light' />
    </ThemeProvider>
  );
}

export default App;

export const ModeButton = styled.button`
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  position: fixed;
  bottom: 1.875rem;
  right: 1.875rem;
  cursor: pointer;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
  background: #f9f9f9;
`;
