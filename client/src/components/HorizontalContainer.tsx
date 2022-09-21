import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Book } from '../pages/Library';
import BookCoverItem from './BookCoverItem';

type HorizontalContainerProps = {
  title: string;
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
  border: 1px solid red;
  overflow: hidden;
  width: 100%;
`;

const ListWrapper = styled.ul`
  /* transform: translate(-50%, 0); */
  width: 100%;
  display: flex;
  align-items: baseline;
  overflow-x: auto;
  white-space: nowrap;
  li {
    display: inline-block;
    padding: 5px;
  }
`;

const HorizontalContainer = ({ title, bookList }: HorizontalContainerProps) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/books/library/${id}`);
  };
  return (
    <Wrapper>
      <h1>{title}</h1>

      <WindowWrapper>
        <ListWrapper>
          {bookList.map((book) => (
            <li key={book.itemId}>
              <BookCoverItem
                src={book.cover}
                onClick={handleClick.bind(null, book.itemId)}
              />
            </li>
          ))}
        </ListWrapper>
      </WindowWrapper>
    </Wrapper>
  );
};

export default HorizontalContainer;
