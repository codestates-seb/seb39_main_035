import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';

const BookDetail = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(!openModal);
  };
  return (
    <Layout>
      <PageTitle title='책 상세 페이지' />
      <h1>{id}</h1>
      <Button color='mint' onClick={openModalHandler}>
        open
      </Button>
      {openModal && (
        <Modal closeModal={openModalHandler}>
          <p>제목을 입력하세요</p>
        </Modal>
      )}
    </Layout>
  );
};

export default BookDetail;
