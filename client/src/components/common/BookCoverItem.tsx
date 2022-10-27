import React from 'react';
import styled from 'styled-components';
import { Book } from '../../types/basic';

type BookCoverItemProps = {
  book?: Book;
  src: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  width?: string;
};

const Wrapper = styled.div`
  display: inline-block;
  padding: 0.3rem;
`;

const Img = styled.img`
  border-radius: 0.3rem;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  cursor: pointer;
  transition: transfrom 300ms ease-in;
  &:hover {
    transform: scale(1.02);
  }
  width: ${(props) => props.width || '5.3rem'};
`;

const BookCoverItem = ({ src, onClick, width }: BookCoverItemProps) => {
  return (
    <Wrapper>
      <Img src={src} alt='book_cover' onClick={onClick} width={width} />
    </Wrapper>
  );
};

export default BookCoverItem;
