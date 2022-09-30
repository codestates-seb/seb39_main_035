import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Search from '../components/Search';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/basic';
import BookCoverItem from '../components/BookCoverItem';

const BookContents = styled.li`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(0 0 0 / 20%);
  &:hover {
    box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
    transform: translate(-0.1rem);
    cursor: pointer;
  }
  .noResults {
    margin-left: 1rem;
  }
`;
const BookContentKeyword = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1rem;
`;

const FirstContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
`;

const SearchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [path, setPath] = useState('');
  const navigate = useNavigate();

  const getBookList = async (path: string) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/ext-lib/${path}`
      );
      setBooks(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message:', error.message);
      } else {
        console.log('unexpected error:', error);
        return 'An unexpected error occurred';
      }
    }
  };

  return (
    <Layout>
      <PageTitle title='같이 한 번 찾아볼까요?' />
      <Search path={path} setPath={setPath} getBookList={getBookList} />
      {books.length === 0 || path === '' ? (
        <FirstContent>
          <p>찾으시는 책이 없네요😅</p>
          <p>다시 검색해보세요</p>
        </FirstContent>
      ) : (
        <ul>
          <BookContents>
            <BsPlusSquare />
            <div className='noResults'>
              찾으시는 책이 없으시면 직접 등록해보세요
            </div>
          </BookContents>
          {books.map((book, idx) => {
            return (
              <BookContents
                key={idx}
                onClick={() =>
                  navigate(`/books/search/${book.title}`, { state: book })
                }
              >
                <BookCoverItem src={book.cover} width='125px' />
                <BookContentKeyword>
                  <div>{book.title}</div>
                  <div>{book.author}</div>
                </BookContentKeyword>
              </BookContents>
            );
          })}
        </ul>
      )}
    </Layout>
  );
};

export default SearchBooks;
