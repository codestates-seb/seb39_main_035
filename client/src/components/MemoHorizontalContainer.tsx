import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import styled from 'styled-components';
import axios from 'axios';
import Carousel from './MemoCarousel';
import Loading from './Loading';
import { MemoBookDetail } from '../types/basic';
import { useLocation } from 'react-router-dom';

type MemoHorizontalContainerProps = {
  memoStatus: string;
  typeText: string;
};

const MemoHorizontalContainer = ({
  memoStatus,
  typeText,
}: MemoHorizontalContainerProps) => {
  const { state } = useLocation();
  const [pageNumber, setPageNumber] = useState(1);
  const [memoList, setMemoList] = useState<MemoBookDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);

  console.log('memoStatus:', memoStatus);
  console.log('memoList:', memoList);

  const fetchBookMemos = async (pageNumber: number, memoStatus: string) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/books/${state.bookId}/memos`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            page: pageNumber,
            size: 1,
            memoType: memoStatus,
          },
        }
      );
      setIsLoading(false);
      setMemoList((prev) => [...prev, ...data.item]);
      setHasMore(pageNumber < data.pageInfo.totalPages);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    fetchBookMemos(pageNumber, memoStatus);
  }, [pageNumber, memoStatus]);

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
      <h1>{typeText}</h1>
      <WindowWrapper>
        <Carousel>
          {memoList.map((memo) => (
            <>
              <MemoBox key={memo.memoId}>{memo.memoContent}</MemoBox>
            </>
          ))}
          <div ref={loader} />
        </Carousel>
      </WindowWrapper>
    </Wrapper>
  );
};

export default MemoHorizontalContainer;

const Wrapper = styled.div`
  margin-bottom: 20px;

  h1 {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
`;

const WindowWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const MemoBox = styled.div`
  border: 1px solid rgba(0 0 0 / 20%);
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  line-height: 1.4rem;
  height: 15rem;
  overflow: scroll;
`;
