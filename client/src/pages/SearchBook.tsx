import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Books } from './SearchBooks';

const BookContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: orange; */
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
`;
const FirstForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
  width: 100%;
`;
const SecondForm = styled.form`
  display: flex;
  /* background-color: orange; */
  width: 100%;
`;
const BookContentImg = styled.img`
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  width: 20%;
`;

export const FormWrapper = styled.div`
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
    &::placeholder {
      font-size: 0.8rem;
      font-family: 'Pretendard-Regular';
    }
    &#title,
    &#author,
    &#publisher {
      width: 100%;
    }
  }
  select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    color: rgba(0 0 0 / 70%);
    font-family: 'Pretendard-Regular';
  }
`;

// aladin ItemLookUp API 연동
const defaultParam = {
  ttbkey: process.env.REACT_APP_API_KEY,
  itemIdType: 'ItemId',
  output: 'js',
  Version: 20131101,
};

type Book = Books & {
  currentPage: number;
  bookStatus: string;
  readStartDate: number;
  redEndDate: number;
  subInfo: { itemPage: number };
};

type GetBookResponse = {
  item: Book[];
};
const SearchBook = () => {
  const { state } = useLocation();
  console.log('state:', state);
  const itemId = state.itemId;
  console.log('itemId:', itemId);
  const [book, setBook] = useState<Book[]>([]);
  console.log('book:', book);

  const [title, setTitle] = useState<string>(state.title);
  const [author, setAuthor] = useState<string>(state.author);
  const [publisher, setPublisher] = useState<string>(state.publisher);
  const [itemPage, setItemPage] = useState<number>();
  const [bookStatus, setBookStatus] = useState<string>();

  console.log('itemPage:', itemPage);

  const getBookContents = async (paramObj: object) => {
    try {
      const params = {
        ...defaultParam,
        ...paramObj,
      };
      const { data } = await axios.get<GetBookResponse>(
        '/aladinapi/api/ItemLookUp.aspx',
        {
          params,
        }
      );
      setBook(data.item);
      setItemPage(data.item[0].subInfo.itemPage);
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
    getBookContents({
      itemId: state.itemId,
    });
  }, []);

  return (
    <Layout>
      <PageTitle title='같이 한 번 등록해볼까요 ?' />
      <BookContainer>
        <BookContentImg src={state.cover} alt='책 이미지' />
        <FirstForm>
          <FormWrapper>
            <label htmlFor='title'>책 제목</label>
            <input
              id='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='이름을 입력해주세요.'
              autoFocus={true}
            />
          </FormWrapper>
          <FormWrapper>
            <label htmlFor='author'>저자</label>
            <input
              id='author'
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder='이름을 입력해주세요.'
            />
          </FormWrapper>
          <FormWrapper>
            <label htmlFor='publisher'>출판사</label>
            <input
              id='publisher'
              type='text'
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder='이름을 입력해주세요.'
            />
          </FormWrapper>
        </FirstForm>
        <SecondForm>
          <FormWrapper>
            <label htmlFor='itemPage'>전체 페이지</label>
            <input
              id='itemPage'
              type='number'
              /* 다음과 같은 에러 발생. value 값이 undefined 일때 ''로 지정하여 해결. 
              Warning: A component is changing an uncontrolled input to be controlled. 
              This is likely caused by the value changing from undefined to a defined value, 
              which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
              */
              value={itemPage || ''}
              onChange={(e) => {
                setItemPage(Number(e.target.value));
              }}
            />
          </FormWrapper>
          <FormWrapper>
            <label htmlFor='bookStatus'>읽기 상태</label>
            <select name='bookStatus' id='bookStatus'>
              <option value=''>📖 읽기 상태를 선택해주세요</option>
              <option value='읽고 싶은 책'>읽고 싶은 책</option>
              <option value='읽고 있는 책'>읽고 있는 책</option>
              <option value='다 읽은 책'>다 읽은 책</option>
            </select>
          </FormWrapper>
        </SecondForm>
        <Button color='pink'>등록하기</Button>
      </BookContainer>
    </Layout>
  );
};
export default SearchBook;
