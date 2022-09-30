import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Books } from '../types/basic';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { register } from '../stores/book/bookSlice';
import { useNavigate } from 'react-router-dom';

const BookContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
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

const SearchBook = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState<Books[]>([]);

  const [cover, setCover] = useState(state.cover);
  const [title, setTitle] = useState(state.title);
  const [author, setAuthor] = useState(state.author);
  const [publisher, setPublisher] = useState(state.publisher);
  const [itemPage, setItemPage] = useState(state.itemPage);
  const [bookStatus, setBookStatus] = useState('📖 읽기 상태를 선택해주세요');
  const [currentPage, setCurrentPage] = useState(0);
  const [readStartDate, setReadStartDate] = useState<string | null>(null);
  const [readEndDate, setReadEndDate] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const selectList = [
    '📖 읽기 상태를 선택해주세요',
    // 숫자로도 가능
    'YET', // '읽고 싶은 책',
    'ING', // '읽고 있는 책',
    'DONE', // '다 읽은 책',
  ];
  const getBookContents = async (path: string) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/ext-lib/${path}`
      );
      setBook(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message:', error.message);
      } else {
        console.log('unexpected error:', error);
        return 'An unexpected error occurred';
      }
    }
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookStatus(e.target.value);
  };

  useEffect(() => {
    getBookContents(title);
  }, []);

  // typescript: handling form onSubmit event
  const registerBook = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 막기
    event.preventDefault();

    // 책 상세 내용
    const bookData = {
      title,
      author,
      cover,
      itemPage,
      currentPage,
      publisher,
      bookStatus,
      readStartDate,
      readEndDate,
    };
    dispatch(register(bookData));
    navigate('/books/library');
  };

  return (
    <Layout>
      <PageTitle title='같이 한 번 등록해볼까요?' />
      <BookContainer>
        <form onSubmit={registerBook}>
          <BookContentImg src={cover} alt='책 이미지' />
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
            <select
              id='bookStatus'
              onChange={handleChangeSelect}
              value={bookStatus}
            >
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </FormWrapper>
          {bookStatus === 'ING' ? (
            <FormWrapper>
              <label htmlFor='readStartDate'>읽기 시작한 날 </label>
              <input
                id='readStartDate'
                type='datetime-local'
                onChange={(e) => setReadStartDate(`${e.target.value}:00`)}
              />
            </FormWrapper>
          ) : null}
          {bookStatus === 'DONE' ? (
            <>
              <FormWrapper>
                <label htmlFor='readStartDate'>읽기 시작한 날</label>
                <input
                  id='readStartDate'
                  type='datetime-local'
                  onChange={(e) => setReadStartDate(`${e.target.value}:00`)}
                />
              </FormWrapper>
              <FormWrapper>
                <label htmlFor='readEndDate'>다 읽은 날</label>
                <input
                  id='readEndDate'
                  type='datetime-local'
                  onChange={(e) => setReadEndDate(`${e.target.value}:00`)}
                />
              </FormWrapper>
            </>
          ) : null}

          <Button color='pink'>등록하기</Button>
        </form>
      </BookContainer>
    </Layout>
  );
};
export default SearchBook;
