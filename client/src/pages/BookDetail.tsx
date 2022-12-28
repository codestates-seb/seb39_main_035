import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/common/Button';
import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import Boxcontainer from '../components/common/BoxContainer';
import BookCoverItem from '../components/common/BookCoverItem';
import StarRating from '../components/BookDetail/StarRating';
import { getBookDetailData } from '../stores/book/bookSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import EditBookInfo from '../components/BookDetail/EditBookInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal';
import MemoList from '../components/BookDetail/MemoList';
import { reset as memoStatusReset } from '../stores/memo/memoSlice';

interface selectList {
  typeValue: string;
  typeText: string;
}

const BookDetail = () => {
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
    dispatch(memoStatusReset());
  }, [isSuccess, dispatch, id]);

  const selectList = [
    { typeValue: 'YET', typeText: '읽고 싶은 책' },
    { typeValue: 'ING', typeText: '읽고 있는 책' },
    { typeValue: 'DONE', typeText: '다 읽은 책' },
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
      <PageTitle title={bookDetail.title} path='/books/library' />
      <BookWrapper>
        <BookCoverItem src={bookDetail.cover} width='200px' />
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
                  {selectList.map((item, idx) => (
                    <option value={item.typeValue} key={idx}>
                      {item.typeText}
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
  min-width: 18.75rem;
  box-shadow: ${(props) => props.theme.colors.boxShadow};
  border-radius: 0.313rem;
  padding: 1.875rem;
  font-size: 1.125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BookSummary = styled.div`
  margin-top: 1.563rem;
  line-height: 1.563rem;
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
    border: 0.063rem solid var(--clear-day);
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
  margin-top: 1.25rem;
  button {
    margin: 0rem;
  }
`;
