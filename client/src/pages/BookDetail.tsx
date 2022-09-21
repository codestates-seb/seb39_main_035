import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import { Book } from '../model/booktype';
import Boxcontainer from '../components/BoxContainer';
import BookCoverItem from '../components/BookCoverItem';

const BookDetail = () => {
  const location = useLocation();
  const book = location.state as Book;
  const [openModal, setOpenModal] = useState(false);

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
