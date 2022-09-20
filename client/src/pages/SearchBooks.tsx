import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Search from '../components/Search';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

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
const BookContentImg = styled.img`
  border-radius: 0.4rem;
  margin-right: 1rem;
`;
const BookContentKeyword = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const FirstContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 2rem;
`;

// aladin API 연동
const defaultParam = {
  ttbkey: process.env.REACT_APP_API_KEY,
  QueryType: 'Keyword',
  MaxResults: 10,
  start: 1,
  SearchTarget: 'Book',
  output: 'js',
  Version: 20131101,
};

type Book = {
  itemId: number;
  title: string;
  author: string;
  cover: string;
  publisher: string;
  // itemPage : number;
};

type GetBookResponse = {
  item: Book[];
};

const SearchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // aladin API axios GET 요청
  const getBookList = async (paramObj: Object) => {
    try {
      const params = {
        ...defaultParam,
        ...paramObj,
      };
      const { data } = await axios.get<GetBookResponse>(
        '/api/ItemSearch.aspx',
        {
          params,
        }
      );
      setBooks(data.item);
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
      <PageTitle title='나만의 도서관' />
      <Search query={query} setQuery={setQuery} getBookList={getBookList} />
      {books.length === 0 || query === '' ? (
        <FirstContent>
          찾으시는 책이 없습니다. 다시 검색해보세요 :D
        </FirstContent>
      ) : (
        <ul>
          <BookContents>
            <BsPlusSquare />
            <div className='noResults'>
              찾으시는 책이 없으면 직접 등록해보세요 :D
            </div>
          </BookContents>
          {books.map((book) => {
            return (
              <BookContents
                key={book.itemId}
                onClick={() => navigate(`/books/search/${book.title}`)}
              >
                <BookContentImg src={book.cover} alt='책 이미지' />
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
