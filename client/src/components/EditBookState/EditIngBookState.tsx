import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import StarRating from '../BookDetail/StarRating';
import Boxcontainer from '../common/BoxContainer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const IngBookState = () => {
  const { bookDetail } = useSelector((state: RootState) => state.book);
  const [currentPage, setCurrentPage] = useState<number>(
    bookDetail.currentPage
  );
  const [star, setStar] = useState<number>(bookDetail.star);
  const [readStartDate, setReadStartDate] = useState<string | null>(
    bookDetail.readStartDate
  );

  // 날짜 표현
  dayjs.locale('ko');
  const startDate = dayjs(readStartDate);
  const readStartdateFormat = startDate.format('YYYY.MM.DD A HH:mm');

  return (
    <>
      <BookStateBox>
        <p>읽기 시작한 날</p>
        <p>{readStartdateFormat}</p>
        <input
          id='readStartDate'
          type='datetime-local'
          onChange={(e) => setReadStartDate(`${e.target.value}:00`)}
        ></input>
      </BookStateBox>
      <Boxcontainer containerTitle='별점'>
        <StarRating star={star} setStar={setStar} />
      </Boxcontainer>
      <Boxcontainer containerTitle='독서 진행 상황'>
        <BookStatusBox>
          <label htmlFor='currentPage'>
            {bookDetail.currentPage} page / {bookDetail.itemPage}
            page
          </label>
          <input
            id='currentPage'
            type='range'
            min='0'
            max={bookDetail.itemPage}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            disabled
          />
        </BookStatusBox>
      </Boxcontainer>
    </>
  );
};

export default IngBookState;

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
