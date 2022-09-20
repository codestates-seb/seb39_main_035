import axios from 'axios';
import { useEffect, useState } from 'react';
import HorizontalContainer from '../components/HorizontalContainer';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import useScrollTop from '../util/useScrollTop';

export type Book = {
  itemId: number;
  cover: string;
  title: string;
  author: string;
};

type GetBookListResponse = {
  item: Book[];
};

const Library = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const getBookListData = async () => {
    const params = {
      ttbkey: process.env.REACT_APP_ALADIN_API_KEY,
      QueryType: 'BestSeller',
      MaxResults: 20,
      start: 1,
      SearchTarget: 'Book',
      output: 'JS',
      Version: 20131101,
    };
    const { data } = await axios.get<GetBookListResponse>(
      '/api/ItemList.aspx',
      { params }
    );
    setBookList(data.item);
  };
  useScrollTop();

  useEffect(() => {
    getBookListData();
  }, []);

  console.log(bookList);

  return (
    <Layout>
      <PageTitle title='서재' />
      <h1>읽고 있는 책</h1>
      <HorizontalContainer bookList={bookList} />
    </Layout>
  );
};

export default Library;
