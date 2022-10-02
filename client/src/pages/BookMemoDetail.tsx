import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import styled from 'styled-components';
import '../styles/Pagination.css';
import { MemoBookDetail } from '../types/basic';
import { Carousel } from './Landing';

interface selectList {
  typeValue: string;
  typeText: string;
}

const BookMemoDetail = () => {
  const { state } = useLocation();
  const { token } = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [memoStatus, setMemoStatus] =
    useState<string>('📝 메모 카테고리를 선택헤주세요');
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMemoStatus(e.target.value);
  };
  const [memoList, setMemoList] = useState<MemoBookDetail[]>([]);
  console.log('memoList:', memoList);
  console.log('memoStatus:', memoStatus);
  const selectList = [
    { typeValue: '', typeText: '📝 메모 카테고리를 선택헤주세요' },
    { typeValue: 'BOOK_CONTENT', typeText: '책 내용' },
    { typeValue: 'SUMMARY', typeText: '책 요약' },
    { typeValue: 'THOUGHT', typeText: '나만의 생각' },
    { typeValue: 'QUESTION', typeText: '나만의 질문' },
  ];
  const fetchBookMemos = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/books/${state.bookId}/memos`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            page: currentPage,
            size: 1,
            memoType: memoStatus,
          },
        }
      );
      setMemoList(data.item);
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
    fetchBookMemos();
  }, [currentPage, memoStatus]);

  return (
    <Layout>
      <PageTitle title='나만의 작은 책 보기' />
      <Wrapper>
        <p>{state.title}</p>
        <FormWrapper>
          <label htmlFor='bookStatus'>읽기 상태</label>
          <select
            id='bookStatus'
            onChange={handleChangeSelect}
            value={memoStatus}
          >
            {selectList.map((item, idx) => (
              <option value={item.typeValue} key={idx}>
                {item.typeText}
              </option>
            ))}
          </select>
        </FormWrapper>
        <Carousel>
          {memoList.map((memo) => (
            <MemoBox key={memo.memoId}>{memo.memoContent}</MemoBox>
          ))}
        </Carousel>
      </Wrapper>
    </Layout>
  );
};

export default BookMemoDetail;

const Wrapper = styled.div`
  p {
    font-size: 1.2rem;
  }
`;
export const FormWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 20px;
  }
  input {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    color: rgba(0 0 0 / 70%);
    font-family: 'Pretendard-Regular';
    width: 100%;
    &::placeholder {
      font-size: 0.8rem;
      font-family: 'Pretendard-Regular';
    }
  }
  select {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    color: rgba(0 0 0 / 70%);
    font-family: 'Pretendard-Regular';
    width: 100%;
  }
`;
const MemoBox = styled.div`
  border: 1px solid rgba(0 0 0 / 20%);
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
`;
