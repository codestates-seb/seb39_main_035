import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
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

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/members/sign-in' element={<SignIn />} />
          <Route path='/members/sign-up' element={<SignUp />} />
          <Route path='/books/search' element={<PrivateRoute />}>
            <Route path='/books/search' element={<SearchBooks />} />
          </Route>
          <Route path='/books/search/:id' element={<PrivateRoute />}>
            <Route path='/books/search/:id' element={<SearchBook />} />
          </Route>
          <Route path='/books/register' element={<PrivateRoute />}>
            <Route path='/books/register' element={<RegisterBook />} />
          </Route>
          <Route path='/books/library' element={<PrivateRoute />}>
            <Route path='/books/library' element={<Library />} />
          </Route>
          <Route path='/books/library/:id' element={<PrivateRoute />}>
            <Route path='/books/library/:id' element={<BookDetail />} />
          </Route>
          <Route path='books/recommend' element={<PrivateRoute />}>
            <Route path='/books/recommend' element={<RecommendBooksList />} />
          </Route>
          <Route path='/mystat' element={<PrivateRoute />}>
            <Route path='/mystat' element={<MyStat />} />
          </Route>
          <Route path='/mypage' element={<PrivateRoute />}>
            <Route path='/mypage' element={<Mypage />} />
          </Route>
          <Route path='/memo' element={<PrivateRoute />}>
            <Route path='/memo' element={<MemoForm />} />
          </Route>
          <Route path='/memo/:id' element={<PrivateRoute />}>
            <Route path='/memo/:id' element={<MemoForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' pauseOnFocusLoss theme='light' />
    </>
  );
}

export default App;
