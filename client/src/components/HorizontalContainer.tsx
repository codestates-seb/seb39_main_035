import styled from 'styled-components';
import { Book } from '../pages/Library';
import BookCoverItem from './BookCoverItem';

type HorizontalContainerProps = {
  bookList: Book[];
};

const Wrapper = styled.ul`
  width: 100%;
  height: 145px;
  padding: 0px;
  overflow-x: auto;
  white-space: nowrap;

  li {
    display: inline-block;
    padding: 5px;
  }
`;

const HorizontalContainer = ({ bookList }: HorizontalContainerProps) => {
  return (
    <Wrapper>
      {bookList.map((book) => (
        <li key={book.itemId}>
          <BookCoverItem src={book.cover} />
        </li>
      ))}
    </Wrapper>
  );
};

export default HorizontalContainer;
