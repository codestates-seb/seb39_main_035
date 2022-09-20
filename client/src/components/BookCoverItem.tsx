import React from 'react';
import styled from 'styled-components';

type BookCoverItemProps = {
  src: string;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
};

const Wrapper = styled.div`
  img {
    border-radius: 5px;
    box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
    cursor: pointer;
    transition: transfrom 300ms ease-in;
    /* margin: 10px; */
  }
  img:hover {
    transform: scale(1.02);
  }
`;

const ItemInfo = styled.div`
  transition: top 1s ease-in;
  &:hover {
  }
`;

const BookCoverItem = ({ src, text, onClick }: BookCoverItemProps) => {
  return (
    <Wrapper>
      <img
        src={src}
        alt='book_cover'
        onMouseEnter={() => console.log('hi')}
        onClick={onClick}
      />
      <ItemInfo>{text}</ItemInfo>
    </Wrapper>
  );
};

export default BookCoverItem;
