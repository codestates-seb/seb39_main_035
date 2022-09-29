import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { RecommendBooks } from '../types/basic';
import Button from '../components/Button';

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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  button {
    margin: 0px;
  }
`;

const RecommendBooksList = () => {
  const [recommendBooks, setRecommendBooks] = useState<RecommendBooks[]>([]);
  const navigate = useNavigate();

  // aladin API axios GET 요청
  const getRecommendBooksList = async (path: string) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/ext-lib/${path}`
      );
      setRecommendBooks(data);
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
      <PageTitle title='이달의 설렘을 추천해요' />
      <button color='pink' onClick={() => getRecommendBooksList('best-seller')}>
        이달의 베스트셀러
      </button>
      <button
        color='mint'
        onClick={() => getRecommendBooksList('item-new-special')}
      >
        이달의 주목할만한 신간리스트
      </button>
      <ul>
        {recommendBooks.map((book, idx) => {
          return (
            <BookContents
              key={idx}
              onClick={() =>
                navigate(`/books/search/${book.title}`, { state: book })
              }
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
    </Layout>
  );
};

export default RecommendBooksList;
