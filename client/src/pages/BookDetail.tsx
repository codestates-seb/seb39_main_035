import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import Boxcontainer from '../components/BoxContainer';
import BookCoverItem from '../components/BookCoverItem';
import StarRating from '../components/StarRating';
import { getBookDetailData } from '../stores/book/bookSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ButtonContainer } from './MyPage';
import { editBookDetail } from '../stores/book/bookSlice';
import { toast } from 'react-toastify';

const BookDetail = () => {
  // const location = useLocation();
  // const book = location.state as BooksDetail;
  // console.log('location:', location);
  // console.log('location.state:', location.state);
  // console.log('book:', book);

  const { id } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [star, setStar] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const { book } = useSelector((state: RootState) => state.book);
  const [editMode, setEditMode] = useState(false);
  const [bookStatus, setBookStatus] = useState(book.bookStatus);
  const [readStartDate, setReadStartDate] = useState<string | null>(
    book.readStartDate
  );
  const [readEndDate, setReadEndDate] = useState<string | null>(
    book.readEndDate
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  // 날짜 표현
  dayjs.locale('ko');
  const startDate = dayjs(readStartDate);
  const readStartdateFormat = startDate.format('YYYY.MM.DD A HH:mm');
  const endDate = dayjs(readEndDate);
  const readEnddateFormat = endDate.format('YYYY.MM.DD A HH:mm');

  useEffect(() => {
    dispatch(getBookDetailData(id));
  }, []);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  const selectList = [
    'YET', // '읽고 싶은 책',
    'ING', // '읽고 있는 책',
    'DONE', // '다 읽은 책',
  ];
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookStatus(e.target.value);
  };
  const exitEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditBookData = async () => {
    const editBookDetailData = {
      author: book.author,
      publisher: book.publisher,
      itemPage: book.itemPage,
      readStartDate,
      readEndDate,
      bookStatus,
      star,
      currentPage,
      bookId: id,
    };
    dispatch(editBookDetail(editBookDetailData));
    toast.success('책 상태가 변경되었습니다');
    exitEditMode();
  };
  return (
    <Layout>
      <PageTitle title={book.title} />
      <BookWrapper>
        <BookCoverItem src={book.cover} />
        <BookSummary>
          <p>저자 : {book.author}</p>
          <p>출판사 : {book.publisher}</p>
          {editMode ? (
            <>
              <BookStateBox>
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
              </BookStateBox>
              {bookStatus === 'ING' ? (
                <>
                  <BookStateBox>
                    <label htmlFor='readStartDate'>
                      읽기 시작한 날 : {readStartdateFormat}
                    </label>
                    <input
                      id='readStartDate'
                      type='datetime-local'
                      onChange={(e) => setReadStartDate(`${e.target.value}:00`)}
                    />
                  </BookStateBox>
                  <Boxcontainer containerTitle='별점'>
                    <StarRating star={star} setStar={setStar} />
                  </Boxcontainer>
                  <Boxcontainer containerTitle='독서 진행 상황'>
                    <BookStatusBox>
                      <label htmlFor='currentPage'>
                        {currentPage} page / {book.itemPage} page
                      </label>
                      <input
                        id='currentPage'
                        type='range'
                        min='0'
                        max='300'
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                      />
                    </BookStatusBox>
                  </Boxcontainer>
                </>
              ) : null}
              {bookStatus === 'DONE' ? (
                <>
                  <BookStateBox>
                    <label htmlFor='readStartDate'>
                      읽기 시작한 날 : {readStartdateFormat}
                    </label>
                    <input
                      id='readStartDate'
                      type='datetime-local'
                      onChange={(e) => setReadStartDate(`${e.target.value}:00`)}
                    />
                  </BookStateBox>
                  <BookStateBox>
                    <label htmlFor='readEndDate'>
                      다 읽은 날 : {readEnddateFormat}
                    </label>
                    <input
                      id='readEndDate'
                      type='datetime-local'
                      onChange={(e) => setReadEndDate(`${e.target.value}:00`)}
                    />
                  </BookStateBox>
                  <Boxcontainer containerTitle='별점'>
                    <StarRating star={star} setStar={setStar} />
                  </Boxcontainer>
                  <Boxcontainer containerTitle='독서 진행 상황'>
                    <BookStatusBox>
                      <label htmlFor='currentPage'>
                        {currentPage} page / {book.itemPage} page
                      </label>
                      <input
                        id='currentPage'
                        type='range'
                        min='0'
                        max='300'
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                      />
                    </BookStatusBox>
                  </Boxcontainer>
                </>
              ) : null}
            </>
          ) : (
            <>
              <BookStateBox>
                <label htmlFor='bookStatus'>읽기 상태</label>
                <select
                  id='bookStatus'
                  onChange={handleChangeSelect}
                  value={bookStatus}
                  disabled
                >
                  {selectList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </BookStateBox>
              {bookStatus === 'ING' ? (
                <>
                  <BookStateBox>
                    <p>읽기 시작한 날</p>
                    <p>{readStartdateFormat}</p>
                  </BookStateBox>
                  <Boxcontainer containerTitle='별점'>
                    <StarRating star={star} setStar={setStar} />
                  </Boxcontainer>
                  <Boxcontainer containerTitle='독서 진행 상황'>
                    <BookStatusBox>
                      <label htmlFor='currentPage'>
                        {currentPage} page / {book.itemPage} page
                      </label>
                      <input
                        id='currentPage'
                        type='range'
                        min='0'
                        max='300'
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        disabled
                      />
                    </BookStatusBox>
                  </Boxcontainer>
                </>
              ) : null}
              {bookStatus === 'DONE' ? (
                <>
                  <BookStateBox>
                    <p>읽기 시작한 날</p>
                    <p>{readStartdateFormat}</p>
                  </BookStateBox>
                  <BookStateBox>
                    <p>다 읽은 날</p>
                    <p>{readEnddateFormat}</p>
                  </BookStateBox>
                  <Boxcontainer containerTitle='별점'>
                    <StarRating star={star} setStar={setStar} />
                  </Boxcontainer>
                  <Boxcontainer containerTitle='독서 진행 상황'>
                    <BookStatusBox>
                      <label htmlFor='currentPage'>
                        {currentPage} page / {book.itemPage} page
                      </label>
                      <input
                        id='currentPage'
                        type='range'
                        min='0'
                        max='300'
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        disabled
                      />
                    </BookStatusBox>
                  </Boxcontainer>
                </>
              ) : null}
            </>
          )}
        </BookSummary>
      </BookWrapper>

      {editMode ? (
        <>
          <Button color='mint' onClick={modalHandler}>
            저장하기
          </Button>
          {openModal && (
            <Modal closeModal={modalHandler}>
              <p>🐛 수정하실 건가요?</p>
              <ButtonContainer>
                <Button color='skyblue' onClick={modalHandler}>
                  취소하기
                </Button>
                <Button color='pink' onClick={handleEditBookData}>
                  수정하기
                </Button>
              </ButtonContainer>
            </Modal>
          )}
        </>
      ) : (
        <Button color='pink' onClick={exitEditMode}>
          변경하기
        </Button>
      )}
    </Layout>
  );
};

export default BookDetail;

const BookWrapper = styled.section`
  min-width: 300px;
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
  border-radius: 5px;
  padding: 30px;
  font-size: 18px;
  display: flex;
`;
const BookSummary = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  p {
    margin-bottom: 0.5rem;
  }
`;

const BookStateBox = styled.div`
  select {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    color: rgba(0 0 0 / 70%);
    font-family: 'Pretendard-Regular';
    width: 100%;
  }
  input {
    margin-top: 0.5rem;
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
`;
const BookStatusBox = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin: 0 auto;
  }
  input {
    margin-top: 0.5rem;
  }
`;
