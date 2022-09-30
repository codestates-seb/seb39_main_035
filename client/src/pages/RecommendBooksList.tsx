import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RecommendBooks } from '../types/basic';
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
const RecommendBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;
const RecommendBtn = styled.button`
  cursor: pointer;
  border: 1px solid rgba(0 0 0 / 20%);
  font-size: 1rem;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: #f9f9f9;
  color: #747474;
  width: 12rem;
  &:hover {
    box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
    transform: translate(-0.1rem);
  }
  &:focus {
    color: #f9f9f9;
    background-color: #747474;
  }
`;

const RecommendBooksList = () => {
  const [recommendBooks, setRecommendBooks] = useState<RecommendBooks[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    getRecommendBooksList('best-seller');
  }, []);

  return (
    <Layout>
      <PageTitle title='이달의 설렘을 추천해요' />
      <RecommendBtnWrapper>
        <RecommendBtn
          color='pink'
          onClick={() => getRecommendBooksList('best-seller')}
          autoFocus={true}
        >
          베스트셀러
        </RecommendBtn>
        <RecommendBtn
          color='mint'
          onClick={() => getRecommendBooksList('item-new-special')}
        >
          주목할만한 신간리스트
        </RecommendBtn>
      </RecommendBtnWrapper>
      <ul>
        {recommendBooks.map((book, idx) => {
          return (
            <BookContents
              key={idx}
              onClick={() =>
                navigate(`/books/search/${book.title}`, { state: book })
              }
            >
              <BookCoverItem src={book.cover} width='100px' />
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
