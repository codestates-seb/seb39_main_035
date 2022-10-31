import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SearchBooks from '../pages/SearchBooks';
import SearchBook from '../pages/SearchBook';
import RegisterBook from '../pages/RegisterBook';
import Library from '../pages/Library';
import BookDetail from '../pages/BookDetail';
import RecommendBooksList from '../pages/RecommendBooksList';
import MyStat from '../pages/MyStat';
import Mypage from '../pages/MyPage';
import MemoForm from '../pages/MemoForm';
import MemoBooks from '../pages/MemoBooks';
import BookMemoDetail from '../pages/BookMemoDetail';

function Router() {
  return (
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
  );
}

export default Router;
