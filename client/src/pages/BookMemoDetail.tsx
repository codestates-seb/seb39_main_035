import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import '../styles/Pagination.css';
import MemoHorizontalContainer from '../components/BookMemoDetail/MemoHorizontalContainer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import {
  changePink,
  changeDefault,
  changeAurora,
  changeStar,
  changeSky,
  changeBlue,
} from '../stores/ui/imageSlice';
import pink from '../assets/btn-pink.png';
import blue from '../assets/btn-blugradient.png';
import white from '../assets/btn-white.png';
import star from '../assets/btn-star5.png';
import aurora from '../assets/btn-aurora.png';
import sky from '../assets/btn-sky.png';

const BookMemoDetail = () => {
  const { state } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [memoStatus, setMemoStatus] = useState<string>('ALL');
  const selectList = [
    { typeValue: 'ALL', typeText: '전체 보기' },
    { typeValue: 'BOOK_CONTENT', typeText: '책 속 문장' },
    { typeValue: 'SUMMARY', typeText: '책 내용 요약' },
    { typeValue: 'THOUGHT', typeText: '나만의 생각' },
    { typeValue: 'QUESTION', typeText: '나만의 질문' },
  ];

  return (
    <Layout>
      <PageTitle title='나만의 작은 책 보기' />
      <Wrapper>
        <h1 className='title'>{state.title}</h1>
        <FormWrapper>
          <label>메모 배경화면 선택</label>
          <ImgButtonWrapper>
            <ImgButton url={white} onClick={() => dispatch(changeDefault())} />
            <ImgButton url={pink} onClick={() => dispatch(changePink())} />
            <ImgButton url={aurora} onClick={() => dispatch(changeAurora())} />
            <ImgButton url={star} onClick={() => dispatch(changeStar())} />
            <ImgButton url={sky} onClick={() => dispatch(changeSky())} />
            <ImgButton url={blue} onClick={() => dispatch(changeBlue())} />
          </ImgButtonWrapper>
          <label htmlFor='bookStatus'>메모 타입</label>
          <StyledSelect>
            {selectList.map((el, index) => {
              return (
                <li
                  key={index}
                  value={el.typeValue}
                  className={
                    el.typeValue === memoStatus ? 'active' : 'inactive'
                  }
                  onClick={() => {
                    setMemoStatus(el.typeValue);
                  }}
                >
                  {el.typeText}
                </li>
              );
            })}
          </StyledSelect>
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
  .title {
    font-size: 1.8rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 2rem;
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
    margin-left: 1rem;
  }
  select {
    margin: 0 auto 1rem 1rem;
    width: 95%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    color: rgba(0 0 0 / 70%);
    font-family: 'Pretendard-Regular';
    font-size: 1rem;
  }
`;

const StyledSelect = styled.ul`
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  color: #f9f9f9;
  font-size: 0.8rem;
  li {
    padding: 0.625rem;
    border-radius: 2rem;
    margin-right: 0.6rem;
  }

  .inactive {
    cursor: pointer;
    background-color: #a5a5a5;
  }
  .active {
    background-color: var(--light-blue);
    transition: 0.5s;
  }
`;

const ImgButtonWrapper = styled.div`
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;

const ImgButton = styled.div<{ url: string }>`
  background: ${(props) => `url(${props.url})`} center;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
  cursor: pointer;
  transition: transfrom 300ms ease-in;
  &:hover {
    transform: scale(1.02);
  }
`;
