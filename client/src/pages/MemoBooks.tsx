import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import BookCoverItem from '../components/common/BookCoverItem';
import { MemoBook } from '../types/basic';
import Pagination from 'react-js-pagination';
import '../styles/Pagination.css';
import { useNavigate } from 'react-router-dom';

const MemoBooks = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [memoBooksList, setMemoBooksList] = useState<MemoBook[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(5);
  const navigate = useNavigate();

  const getMemoBooksList = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + '/books/memo-books',
        {
          headers: {
            Authorization: token,
          },
          params: {
            page: currentPage,
            size: 18,
          },
        }
      );
      setMemoBooksList(data.item);
      setTotalElements(data.pageInfo.totalElements);
      setTotalPages(data.pageInfo.totalPages);
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
    getMemoBooksList();
  }, [currentPage]);
  return (
    <Layout>
      <PageTitle title='나만의 작은 책' />
      <Wrapper>
        <WindowWrapper>
          {memoBooksList.map((memoBookList) => (
            <BookCoverItem
              key={memoBookList.bookId}
              src={memoBookList.cover}
              onClick={() =>
                navigate(`/books/${memoBookList.bookId}/memos`, {
                  state: memoBookList,
                })
              }
            />
          ))}
        </WindowWrapper>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={18}
          totalItemsCount={totalElements}
          pageRangeDisplayed={totalPages}
          prevPageText={'<'}
          nextPageText={'>'}
          onChange={(page) => setCurrentPage(page)}
        />
      </Wrapper>
    </Layout>
  );
};
export default MemoBooks;

const Wrapper = styled.div`
  margin-bottom: 1.25rem;
`;

const WindowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
