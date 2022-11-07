import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import Boxcontainer from '../common/BoxContainer';
import StarRating from '../BookDetail/StarRating';

const DoneBookState = () => {
  const { bookDetail } = useSelector((state: RootState) => state.book);
  const [star, setStar] = useState<number>(bookDetail.star);
  const [currentPage, setCurrentPage] = useState<number>(
    bookDetail.currentPage
  );
  const [readStartDate, setReadStartDate] = useState<string | null>(
    bookDetail.readStartDate
  );
  const [readEndDate, setReadEndDate] = useState<string | null>(
    bookDetail.readEndDate
  );
  // 날짜 표현
  dayjs.locale('ko');
  const startDate = dayjs(readStartDate);
  const readStartdateFormat = startDate.format('YYYY.MM.DD A HH:mm');
  const endDate = dayjs(readEndDate);
  const readEnddateFormat = endDate.format('YYYY.MM.DD A HH:mm');

  return (
    <>
      <BookStateBox>
        <label htmlFor='readStartDate'>읽기 시작한 날</label>
        <p>{readStartdateFormat}</p>
        <input
          id='readStartDate'
          type='datetime-local'
          onChange={(e) => setReadStartDate(`${e.target.value}:00`)}
        />
      </BookStateBox>
      <BookStateBox>
        <label htmlFor='readEndDate'>다 읽은 날</label>
        <p>{readEnddateFormat}</p>
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
  );
};
export default DoneBookState;

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
