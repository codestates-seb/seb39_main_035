import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Book } from '../types/basic';
import BookCoverItem from './BookCoverItem';

type HorizontalContainerProps = {
  bookStatus: string;
  bookList: Book[];
};
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

const HorizontalContainer = ({
  bookStatus,
  bookList,
}: HorizontalContainerProps) => {
  const navigate = useNavigate();
  // const handleClick = (id: number, book: Book) => {
  //   navigate(`/books/library/${id}`, { state: book });
  // };
  return (
    <Wrapper>
      <h1>{bookStatus}</h1>
      <WindowWrapper>
        <ListWrapper>
          {bookList.map((book) => (
            <BookCoverItem
              key={book.itemId}
              src='https://image.aladin.co.kr/product/28494/9/coversum/8956594317_1.jpg'
              // book={book}
              // onClick={handleClick.bind(null, book.itemId, book)}
            />
          ))}
        </ListWrapper>
      </WindowWrapper>
    </Wrapper>
  );
};

export default HorizontalContainer;
