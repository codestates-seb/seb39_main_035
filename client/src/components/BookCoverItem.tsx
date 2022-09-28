import React from 'react';
import styled from 'styled-components';
import { Book } from '../types/basic';

type BookCoverItemProps = {
  book?: Book;
  src: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
};

const Wrapper = styled.div`
  display: inline-block;
  padding: 5px;
`;

const Img = styled.img`
  border-radius: 5px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  cursor: pointer;
  transition: transfrom 300ms ease-in;
  /* margin: 10px; */
  &:hover {
    transform: scale(1.02);
  }
`;

// const ItemInfo = styled.div`
//   transition: top 1s ease-in;
//   &:hover {
//   }
// `;

const BookCoverItem = ({ src, onClick }: BookCoverItemProps) => {
  return (
    <Wrapper>
      <Img
        src={src}
        alt='book_cover'
        // onMouseEnter={() => console.log('hi')}
        onClick={onClick}
      />
    </Wrapper>
  );
};

export default BookCoverItem;
