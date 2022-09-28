import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Books } from '../types/basic';
import BookCoverItem from './BookCoverItem';
import useLibraryData from '../util/useLibraryData';

type HorizontalContainerProps = {
  bookStatus: 'YET' | 'ING' | 'DONE';
  title: string;
};

const HorizontalContainer = ({
  title,
  bookStatus,
}: HorizontalContainerProps) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const handleClick = (id: number) => {
    navigate(`/books/library/${id}`);
  };

  const { isLoading, error, bookList, hasMoreData } = useLibraryData(
    pageNumber,
    bookStatus
  );
  const observer = React.useRef();
  // const lastItemRef = useCallback(node => {
  //   if(isLoading) return
  //   if(observer.current) observer.current.disconnect()
  // })

  return (
    <Wrapper>
      <h1>{title}</h1>
      <WindowWrapper>
        <ListWrapper>
          {bookList.map((book, index) => (
            <ImgWrapper key={book.bookId}>
              <BookCoverItem
                src={book.cover}
                // book={book}
                onClick={handleClick.bind(null, book.bookId)}
              />
            </ImgWrapper>
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

const ImgWrapper = styled.div`
  display: inline-block;
  padding: 5px;
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
