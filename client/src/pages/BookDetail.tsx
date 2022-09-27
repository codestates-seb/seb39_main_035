import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import { Book } from '../types/basic';
import Boxcontainer from '../components/BoxContainer';
import BookCoverItem from '../components/BookCoverItem';
import StarRating from '../components/StarRating';
import axios from 'axios';

interface BookResponse {
  bookId: number;
  title: string;
  cover: string;
  author: string;
  publisher: string;
  createdAt: string;
  start: number;
  currentPage: number;
  itempPage: number;
  bookStatus: number;
}

const BookDetail = () => {
  const location = useLocation();
  const book = location.state as Book;
  const [openModal, setOpenModal] = useState(false);
  const [star, setStar] = useState<number>(0);

  // useEffect(() => {
  //   try {
  //     const response = axios.get(
  //       process.env.REACT_APP_API_BASE_URL + '/books/library'
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };
  return (
    <Layout>
      <PageTitle title={book.title} />
      <Boxcontainer>
        <BookCoverItem book={book} />
        <BookSummary>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>읽기 상태</p>
        </BookSummary>
      </Boxcontainer>
      <Button color='mint' onClick={modalHandler}>
        open
      </Button>
      {openModal && (
        <Modal closeModal={modalHandler}>
          <p>{book.title}</p>
        </Modal>
      )}
      <Boxcontainer containerTitle='독서 진행 상황'>
        <p>page정보</p>
      </Boxcontainer>
      <Boxcontainer containerTitle='별점'>
        <StarRating star={star} setStar={setStar} />
      </Boxcontainer>
    </Layout>
  );
};

export default BookDetail;

const BookSummary = styled.div`
  display: inline-block;
  margin-left: 30px;
  > p {
    margin-bottom: 5px;
  }
`;
