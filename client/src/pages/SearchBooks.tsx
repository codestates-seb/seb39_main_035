import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Search from '../components/SearchBook/Search';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/basic';
import BookCoverItem from '../components/common/BookCoverItem';

const BookContents = styled.li`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  border: ${(props) => props.theme.colors.border};
  &:hover {
    box-shadow: ${(props) => props.theme.colors.boxShadow};
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

const FirstContent = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: center;
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
      <PageTitle title='검색' />
      <Search path={path} setPath={setPath} getBookList={getBookList} />
      {books.length === 0 || path === '' ? (
        <FirstContent>찾으시는 책이 없어요😖 다시 검색해보세요</FirstContent>
      ) : (
        <ul>
          <BookContents>
            <BsPlusSquare />
            <div
              className='noResults'
              onClick={() => navigate('/books/register')}
            >
              찾으시는 책이 없다면 직접 등록해보세요
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
