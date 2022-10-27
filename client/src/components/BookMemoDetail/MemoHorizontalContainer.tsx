import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import styled from 'styled-components';
import axios from 'axios';
import Carousel from './MemoCarousel';
import Loading from '../common/Loading';
import { MemoBookDetail } from '../../types/basic';
import { useLocation } from 'react-router-dom';
import MemoBoxContainer from './MemoBoxContainer';

type MemoHorizontalContainerProps = {
  memoStatus: string;
  typeText: string;
};

const MemoHorizontalContainer = ({
  memoStatus,
  typeText,
}: MemoHorizontalContainerProps) => {
  const { state } = useLocation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [memoList, setMemoList] = useState<MemoBookDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const memoCount = state.memoCount;
  const { token } = useSelector((state: RootState) => state.user);

  const fetchBookMemos = async (
    pageNumber: number,
    memoStatus: string,
    memoCount: number
  ) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/books/${state.bookId}/memos`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            page: pageNumber,
            size: memoCount,
            memoType: memoStatus,
          },
        }
      );
      setIsLoading(false);
      setMemoList(() => [...data.item]);
      setHasMore(pageNumber < data.pageInfo.totalPages);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    fetchBookMemos(pageNumber, memoStatus, memoCount);
  }, [memoStatus, pageNumber, memoCount]);

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
          {memoList.map((memo) => (
            <MemoBoxContainer
              key={memo.memoId}
              memoBookPage={memo.memoBookPage}
              memoContent={memo.memoContent}
              createdAt={memo.createdAt}
              updatedAt={memo.updatedAt}
            />
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
  margin-left: 1rem;
  margin-right: 1rem;
  h1 {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 1rem;
  }
`;

const WindowWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;
