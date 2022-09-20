import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

console.log('process.env.REACT_APP_API_KEY:', process.env.REACT_APP_API_KEY);
// aladin API 연동
const defaultParam = {
  QueryType: 'Keyword',
  MaxResults: 10,
  start: 1,
  SearchTarget: 'Book',
  output: 'js',
  Version: 20131101,
};

type Book = {
  itemId: number;
  title: string;
  author: string;
  cover: string;
  publisher: string;
  // itemPage : number;
};

type GetBookResponse = {
  item: Book[];
};

const Search = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');

  // aladin API axios GET 요청
  const getBookList = async (paramObj: any) => {
    try {
      const params = {
        ...defaultParam,
        ...paramObj,
      };
      const { data, status } = await axios.get<GetBookResponse>(
        '/api/ItemSearch.aspx',
        {
          params,
        }
      );
      console.log(data.item);
      setBooks(data.item);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message:', error.message);
      } else {
        console.log('unexpected error:', error);
        return 'An unexpected error occurred';
      }
    }
  };
  useEffect(() => {
    getBookList({
      Query: 'aladin',
    });
  }, []);

  return (
    <></>
    // <Layout>
    //   <PageTitle title='책을 검색해보세요!' />
    //   <ul>
    //   {books.map((book)=>{
    //     <li key={book.itemId}>
    //       <img src=`${book.cover}` alt="책 이미지" />
    //       <div>book.title</div>
    //       <div>book.author</div>

    //     </li>
    //   })}
    //   </ul>
    // </Layout>
  );
};

export default Search;
