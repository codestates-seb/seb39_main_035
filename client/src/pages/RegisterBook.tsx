import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import styled from 'styled-components';
import Button from '../components/common/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { register } from '../stores/book/bookSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { reset } from '../stores/book/bookSlice';

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
    font-size: 1.2rem;
    line-height: 1.25rem;
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

const RegisterBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [cover, setCover] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [itemPage, setItemPage] = useState(0);
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

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookStatus(e.target.value);
  };

  // typescript: handling form onSubmit event
  const registerBook = async (e: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 막기
    e.preventDefault();
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

  // cloudinary를 활용한 image 업로드
  const imageUploader = async (file: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'afqmbgkk');

    // 'starrypro' env 파일에서 가져올 수 있도록 수정
    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/starrypro/image/upload',
        formData
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message:', error.message);
      } else {
        console.log('unexpected error:', error);
        return 'An unexpected error occurred';
      }
    }
  };
  const fileChange = async (e: any) => {
    const uploaded = await imageUploader(e.target.files[0]);
    setCover(uploaded.url);
  };

  useEffect(() => {
    dispatch(reset());
  }, []);
  return (
    <Layout>
      <PageTitle title='같이 한 번 등록해볼까요?' />
      <BookContainer>
        <form onSubmit={registerBook}>
          <FormWrapper>
            <label htmlFor='cover'>책 표지</label>
            {cover && <img src={cover} alt='책 표지' />}
            <input
              id='cover'
              type='file'
              accept='image/*'
              onChange={fileChange}
            />
          </FormWrapper>
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
              placeholder='전체 페이지를 입력해주세요.'
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
export default RegisterBook;
