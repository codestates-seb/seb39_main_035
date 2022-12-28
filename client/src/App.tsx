import Header from './components/layout/Header';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './stores/store';
import styled from 'styled-components';
import { setDefaultTheme, setDarkTheme } from './stores/themeSlice';
import darkMode from './assets/dark_mode.png';
import lightMode from './assets/light_mode.png';
import Router from './routes/Router';

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
      <GlobalStyle />
      <Header />
      <Router />
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
