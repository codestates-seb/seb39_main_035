import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
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
import EditBookInfo from '../components/EditBookInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import MemoList from '../components/MemoList';

const BookDetail = () => {
  // const location = useLocation();
  // const book = location.state as BooksDetail;
  // console.log('location:', location);
  // console.log('location.state:', location.state);
  // console.log('book:', book);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { bookDetail } = useSelector((state: RootState) => state.book);
  const { token } = useSelector((state: RootState) => state.user);
  const { isSuccess } = useSelector((state: RootState) => state.memo);
  const [openModal, setOpenModal] = useState(false);
  const [star, setStar] = useState<number>(bookDetail.star);

  const [currentPage, setCurrentPage] = useState<number>(
    bookDetail.currentPage
  );
  const [editMode, setEditMode] = useState(false);

  // 날짜 표현
  dayjs.locale('ko');
  const startDate = dayjs(bookDetail.readStartDate);
  const readStartdateFormat = startDate.format('YYYY.MM.DD A HH:mm');
  const endDate = dayjs(bookDetail.readEndDate);
  const readEnddateFormat = endDate.format('YYYY.MM.DD A HH:mm');

  useEffect(() => {
    dispatch(getBookDetailData(id));
  }, [isSuccess, dispatch, id]);

  const selectList = [
    'YET', // '읽고 싶은 책',
    'ING', // '읽고 있는 책',
    'DONE', // '다 읽은 책',
  ];

  const exitEditMode = () => {
    setEditMode(!editMode);
  };
  const modalHandler = () => {
    setOpenModal(!openModal);
  };
  const handleBookDelete = async () => {
    try {
      await axios.delete(process.env.REACT_APP_API_BASE_URL + `/books/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      toast.success('🗑️ 등록하신 책이 삭제되었어요');
      navigate('/books/library');
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <PageTitle title={bookDetail.title} />
      <BookWrapper>
        <BookCoverItem src={bookDetail.cover} />
        <BookSummary>
          <p>저자 : {bookDetail.author}</p>
          <p>출판사 : {bookDetail.publisher}</p>
          {editMode ? (
            <EditBookInfo exitEditMode={exitEditMode} />
          ) : (
            <>
              <BookStateBox>
                <label htmlFor='bookStatus'>읽기 상태</label>
                <select id='bookStatus' value={bookDetail.bookStatus} disabled>
                  {selectList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </BookStateBox>
              {bookDetail.bookStatus === 'ING' ? (
                <>
                  <BookStateBox>
                    <p>읽기 시작한 날</p>
                    <p>{readStartdateFormat}</p>
                  </BookStateBox>
                  <Boxcontainer containerTitle='별점'>
                    <StarRating star={bookDetail.star} setStar={setStar} />
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
                        value={bookDetail.currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        disabled
                      />
                    </BookStatusBox>
                  </Boxcontainer>
                </>
              ) : null}
              {bookDetail.bookStatus === 'DONE' ? (
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
                    <StarRating star={bookDetail.star} setStar={setStar} />
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
                        value={bookDetail.currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        disabled
                      />
                    </BookStatusBox>
                  </Boxcontainer>
                </>
              ) : null}
              <ButtonContainer>
                <Button color='pink' onClick={exitEditMode}>
                  변경하기
                </Button>
                <Button color='mint' onClick={modalHandler}>
                  삭제하기
                </Button>
              </ButtonContainer>
              {openModal && (
                <Modal closeModal={modalHandler}>
                  <p>🥲정말 삭제하시겠습니까?</p>
                  <ButtonContainer>
                    <Button color='skyblue' onClick={modalHandler}>
                      취소하기
                    </Button>
                    <Button color='pink' onClick={handleBookDelete}>
                      삭제하기
                    </Button>
                  </ButtonContainer>
                </Modal>
              )}
            </>
          )}
        </BookSummary>
      </BookWrapper>
      <MemoList />
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
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  button {
    margin: 0px;
  }
`;
