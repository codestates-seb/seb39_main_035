import { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../stores/store';
import styled from 'styled-components';
import BookCoverItem from '../common/BookCoverItem';
import { AppDispatch } from '../../stores/store';
import Carousel from '../common/Carousel';
import Loading from '../common/Loading';
import { AbandonBook } from '../../types/basic';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AbandonBooks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [abandonBookList, setAbandonBookList] = useState<AbandonBook[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);
  const handleClick = (id: number) => {
    navigate(`/books/library/${id}`);
  };

  useEffect(() => {
    const fetcAbandonBookData = async (pageNumber: number) => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_BASE_URL + '/books/abandon',
          {
            headers: {
              Authorization: token,
            },
            params: {
              page: pageNumber,
              size: 10,
            },
          }
        );
        setIsLoading(false);
        setAbandonBookList(data.item);
        setHasMore(pageNumber < data.pageInfo.totalPages);
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          setIsError(true);
          console.log('error:', error);
        }
      }
    };
    fetcAbandonBookData(pageNumber);
  }, [pageNumber, token]);

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
      <WindowWrapper>
        <Carousel>
          {abandonBookList.map((abandonBook) => (
            <BookCoverItem
              key={abandonBook.bookId}
              src={abandonBook.cover}
              onClick={handleClick.bind(null, abandonBook.bookId)}
            />
          ))}
          <div ref={loader} />
        </Carousel>
      </WindowWrapper>
    </Wrapper>
  );
};

export default AbandonBooks;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const WindowWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;
