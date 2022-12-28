import { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../stores/store';
import { Books } from '../../types/basic';
import styled from 'styled-components';
import BookCoverItem from '../common/BookCoverItem';
import axios from 'axios';
import Carousel from '../common/Carousel';
import Loading from '../common/Loading';

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
  const [bookList, setBookList] = useState<BookListItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);
  const handleClick = (id: number) => {
    navigate(`/books/library/${id}`);
  };

  const fetchBookData = useCallback(
    async (pageNumber: number) => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_BASE_URL + '/books/library',
          {
            headers: {
              Authorization: token,
            },
            params: {
              page: pageNumber,
              size: 10,
              bookStatus: bookStatus,
            },
          }
        );
        setIsLoading(false);
        setBookList((prev) => [...prev, ...data.item]);
        setHasMore(pageNumber < data.pageInfo.totalPages);
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          setIsError(true);
        }
      }
    },
    [bookStatus, token]
  );
  useEffect(() => {
    fetchBookData(pageNumber);
  }, [pageNumber, fetchBookData]);

  const loader = useRef(null);
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  if (isLoading) return <Loading />;

  if (isError) return <p>cannot load data</p>;
  return (
    <Wrapper>
      <h1>{title}</h1>
      <WindowWrapper>
        <Carousel>
          {bookList.map((book, index) => (
            <BookCoverItem
              key={book.bookId}
              src={book.cover}
              onClick={handleClick.bind(null, book.bookId)}
            />
          ))}
          <div ref={loader} />
        </Carousel>
      </WindowWrapper>
    </Wrapper>
  );
};

export default HorizontalContainer;

const Wrapper = styled.div`
  margin-bottom: 1.25rem;

  h1 {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
    margin-left: 0.6rem;
  }
`;

const WindowWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;
