import React from 'react';
import styled from 'styled-components';
import { Book } from '../model/booktype';

type BookCoverItemProps = {
  book: Book;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
};

const Wrapper = styled.div`
  display: inline-block;
  padding: 5px;
  > img {
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
    cursor: pointer;
    transition: transfrom 300ms ease-in;
    /* margin: 10px; */
  }
  > img:hover {
    transform: scale(1.02);
  }
`;

// const ItemInfo = styled.div`
//   transition: top 1s ease-in;
//   &:hover {
//   }
// `;

const BookCoverItem = ({ book, onClick }: BookCoverItemProps) => {
  return (
    <Wrapper>
      <img
        src={book.cover}
        alt='book_cover'
        // onMouseEnter={() => console.log('hi')}
        onClick={onClick}
      />
    </Wrapper>
  );
};

export default BookCoverItem;
