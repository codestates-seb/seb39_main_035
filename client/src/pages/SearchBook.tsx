import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Books } from '../types/basic';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { register } from '../stores/book/bookSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { reset } from '../stores/book/bookSlice';
import BookCoverItem from '../components/common/BookCoverItem';

const BookContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0rem 0rem 0.25rem 0rem rgba(0 0 0 / 20%);
`;

export const FormWrapper = styled.div`
  width: 100%;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 1.25rem;
  }
  input {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 0.063rem solid var(--clear-day);
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
    border: 0.063rem solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    color: rgba(0 0 0 / 70%);
    font-family: 'Pretendard-Regular';
    width: 100%;
  }
`;

interface selectList {
  typeValue: string;
  typeText: string;
}

const SearchBook = () => {
  const { state } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Books[]>([]);
  const [cover, setCover] = useState(state.cover);
  const [title, setTitle] = useState(state.title);
  const [author, setAuthor] = useState(state.author);
  const [publisher, setPublisher] = useState(state.publisher);
  const [itemPage, setItemPage] = useState(state.itemPage);
  const [bookStatus, setBookStatus] =
    useState<string>('📖 읽기 상태를 선택해주세요');
  const [currentPage, setCurrentPage] = useState(0);
  const [readStartDate, setReadStartDate] = useState<string | null>(null);
  const [readEndDate, setReadEndDate] = useState<string | null>(null);

  const selectList = [
    { typeValue: '', typeText: '📖 읽기 상태를 선택해주세요' },
    { typeValue: 'YET', typeText: '읽고 싶은 책' },
    { typeValue: 'ING', typeText: '읽고 있는 책' },
    { typeValue: 'DONE', typeText: '다 읽은 책' },
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

  useEffect(() => {
    getBookContents(title);
    dispatch(reset());
  }, []);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookStatus(e.target.value);
  };

  // typescript: handling form onSubmit event
  const registerBook = async (event: React.FormEvent<HTMLFormElement>) => {
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
    await dispatch(register(bookData));
  };
  const { isSuccess } = useSelector((state: RootState) => state.book);
  if (isSuccess) {
    navigate('/books/library');
  }

  return (
    <Layout>
      <PageTitle title='등록' />
      <BookContainer>
        <form onSubmit={registerBook}>
          <BookCoverItem src={cover} width='200px' />
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
              {selectList.map((item, idx) => (
                <option value={item.typeValue} key={idx}>
                  {item.typeText}
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
