import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RecommendBooks } from '../types/basic';
import BookCoverItem from '../components/common/BookCoverItem';

const BookContents = styled.li`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  border: ${(props) => props.theme.colors.border};
  &:hover {
    box-shadow: ${(props) => props.theme.colors.boxShadow};
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
  border: 0.063rem solid rgba(0 0 0 / 20%);
  font-size: 1rem;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.font};
  width: 12rem;
  &:hover {
    box-shadow: ${(props) => props.theme.colors.boxShadow};
    transform: translate(-0.1rem);
  }
  &:focus {
    color: ${(props) => props.theme.colors.bg};
    background-color: ${(props) => props.theme.colors.font};
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
      <PageTitle title='추천' />
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
              <BookCoverItem src={book.cover} />
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
