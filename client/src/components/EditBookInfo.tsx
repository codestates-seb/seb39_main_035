import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Boxcontainer from './BoxContainer';
import StarRating from './StarRating';
import Button from './Button';
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { editBookDetail } from '../stores/book/bookSlice';
import { toast } from 'react-toastify';

const EditBookInfo = () => {
  const { id } = useParams();
  const { bookDetail } = useSelector((state: RootState) => state.book);
  const [bookStatus, setBookStatus] = useState<string>(bookDetail.bookStatus);
  const [star, setStar] = useState<number>(bookDetail.star);
  const [currentPage, setCurrentPage] = useState<number>(
    bookDetail.currentPage
  );
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookStatus(e.target.value);
  };
  const [readStartDate, setReadStartDate] = useState<string | null>(
    bookDetail.readStartDate
  );
  const [readEndDate, setReadEndDate] = useState<string | null>(
    bookDetail.readEndDate
  );
  const selectList = [
    'YET', // '읽고 싶은 책',
    'ING', // '읽고 있는 책',
    'DONE', // '다 읽은 책',
  ];
  const modalHandler = () => {
    setOpenModal(!openModal);
  };
  const exitEditMode = () => {
    setEditMode(!editMode);
  };
  const dispatch = useDispatch<AppDispatch>();
  // 날짜 표현
  dayjs.locale('ko');
  const startDate = dayjs(readStartDate);
  const readStartdateFormat = startDate.format('YYYY.MM.DD A HH:mm');
  const endDate = dayjs(readEndDate);
  const readEnddateFormat = endDate.format('YYYY.MM.DD A HH:mm');

  const handleEditBookData = async () => {
    const editBookDetailData = {
      author: bookDetail.author,
      publisher: bookDetail.publisher,
      itemPage: bookDetail.itemPage,
      readStartDate,
      readEndDate,
      bookStatus,
      star,
      currentPage,
      bookId: id,
    };
    dispatch(editBookDetail(editBookDetailData));
    toast.success('책 상태가 변경되었습니다');
    setEditMode(true);
  };
  return (
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
                {currentPage} page / {bookDetail.itemPage} page
              </label>
              <input
                id='currentPage'
                type='range'
                min='0'
                max={bookDetail.itemPage}
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
                {currentPage} page / {bookDetail.itemPage} page
              </label>
              <input
                id='currentPage'
                type='range'
                min='0'
                max={bookDetail.itemPage}
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
              />
            </BookStatusBox>
          </Boxcontainer>
        </>
      ) : null}
      <ButtonContainer>
        <Button color='mint' onClick={modalHandler}>
          저장하기
        </Button>
        <Button
          color='mint'
          onClick={() => {
            return window.location.reload();
          }}
        >
          뒤로가기
        </Button>
      </ButtonContainer>
      {openModal && (
        <Modal closeModal={modalHandler}>
          <p>🐛 수정하실 건가요?</p>
          <ButtonContainer>
            <Button
              color='skyblue'
              onClick={() => {
                return modalHandler();
              }}
            >
              취소하기
            </Button>
            <Button
              color='pink'
              onClick={() => {
                return handleEditBookData(), modalHandler();
              }}
            >
              수정하기
            </Button>
          </ButtonContainer>
        </Modal>
      )}
    </>
  );
};
export default EditBookInfo;

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
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  button {
    margin: 0px;
  }
`;
