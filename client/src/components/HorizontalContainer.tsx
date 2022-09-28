import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BookDetail, Books } from '../types/basic';
import BookCoverItem from './BookCoverItem';
import useLibraryData from '../util/useLibraryData';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

type HorizontalContainerProps = {
  bookStatus: 'YET' | 'ING' | 'DONE';
  title: string;
};

interface BookListItem extends Books {
  bookId: number;
}

const HorizontalContainer = ({
  title,
  bookStatus,
}: HorizontalContainerProps) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const handleClick = (id: number) => {
    navigate(`/books/library/${id}`);
  };
  const [bookList, setBookList] = useState<BookListItem[]>([]);
  const { token } = useSelector((state: RootState) => state.user);
  const fetchBookData = async (pageNumber: number) => {
    await axios
      .get(process.env.REACT_APP_API_BASE_URL + '/books/library', {
        headers: {
          Authorization: token,
        },
        params: {
          page: pageNumber,
          size: 10,
          bookStatus: bookStatus,
        },
      })
      .then((res) => {
        setBookList((prev) => [...prev, ...res.data.item]);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        console.log(e);
      });
  };

  useEffect(() => {
    fetchBookData(pageNumber);
  }, [pageNumber]);
  // const { isLoading, error, bookList, hasMoreData } = useLibraryData(
  //   pageNumber,
  //   bookStatus
  // );
  const observer = React.useRef();
  // const lastItemRef = useCallback(node => {
  //   if(isLoading) return
  //   if(observer.current) observer.current.disconnect()
  // })
  // const handleAddList = useCallback(() => {
  //   //
  //   if (hasMoreData) {
  //     setPageNumber((prevPageNumber) => prevPageNumber + 1);
  //   }
  // }, [hasMoreData]);

  const handleAddList = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <Wrapper>
      <h1>{title}</h1>
      <button onClick={handleAddList}>리스트 추가 요청</button>
      <WindowWrapper>
        <ListWrapper>
          {bookList.map((book, index) => (
            <BookCoverItem
              key={book.bookId}
              src={book.cover}
              // book={book}
              onClick={handleClick.bind(null, book.bookId)}
            />
          ))}
        </ListWrapper>
      </WindowWrapper>
    </Wrapper>
  );
};

export default HorizontalContainer;

const Wrapper = styled.div`
  margin-bottom: 20px;

  h1 {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 10px; // 추가
  }
`;

const WindowWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  overflow-x: auto;
  white-space: nowrap;
`;

const BookAddButton = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(0 0 0 / 20%);
  svg {
    margin-right: 30px;
  }
  &:hover {
    cursor: pointer;
  }
`;
