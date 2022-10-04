import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import '../styles/Pagination.css';
import MemoHorizontalContainer from '../components/MemoHorizontalContainer';
interface selectList {
  typeValue: string;
  typeText: string;
}

const BookMemoDetail = () => {
  const { state } = useLocation();
  const [memoStatus, setMemoStatus] = useState<string>('ALL');
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMemoStatus(e.target.value);
  };
  const selectList = [
    { typeValue: 'ALL', typeText: '📝 메모 카테고리를 선택헤주세요' },
    { typeValue: 'BOOK_CONTENT', typeText: '책 내용' },
    { typeValue: 'SUMMARY', typeText: '책 요약' },
    { typeValue: 'THOUGHT', typeText: '나만의 생각' },
    { typeValue: 'QUESTION', typeText: '나만의 질문' },
  ];

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
        {memoStatus === 'ALL' && (
          <MemoHorizontalContainer memoStatus='ALL' typeText='전체 카테고리' />
        )}
        {memoStatus === 'BOOK_CONTENT' && (
          <MemoHorizontalContainer
            memoStatus='BOOK_CONTENT'
            typeText='책 내용'
          />
        )}
        {memoStatus === 'SUMMARY' && (
          <MemoHorizontalContainer memoStatus='SUMMARY' typeText='책 요약' />
        )}
        {memoStatus === 'THOUGHT' && (
          <MemoHorizontalContainer
            memoStatus='THOUGHT'
            typeText='나만의 생각'
          />
        )}
        {memoStatus === 'QUESTION' && (
          <MemoHorizontalContainer
            memoStatus='QUESTION'
            typeText='나만의 질문'
          />
        )}
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
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 20px;
  }
  select {
    margin-bottom: 1rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    color: rgba(0 0 0 / 70%);
    font-family: 'Pretendard-Regular';
    width: 100%;
  }
`;
