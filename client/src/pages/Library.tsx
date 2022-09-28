import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HorizontalContainer from '../components/HorizontalContainer';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import useScrollTop from '../util/useScrollTop';
import { Book } from '../types/basic';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface GetBookListResponse {
  item: Book[];
}

const Library = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState<Book[]>([]);

  useScrollTop();

  return (
    <Layout>
      <PageTitle title='서재' />
      <BookAddButton onClick={() => navigate('/books/search')}>
        <BsPlusSquare />
        <div className='noResults'>읽고 싶은 책을 추가해보세요 🤗</div>
      </BookAddButton>
      <HorizontalContainer bookStatus='읽고 있는 책' bookList={bookList} />
      <HorizontalContainer bookStatus='읽고 싶은 책' bookList={bookList} />
      <HorizontalContainer bookStatus='다 읽은 책' bookList={bookList} />
    </Layout>
  );
};

export default Library;

const BookAddButton = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid rgba(0 0 0 / 20%);
  transition: transfrom 300ms ease-in;
  svg {
    margin-right: 30px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
    transform: translate(-0.1rem);
  }
`;
