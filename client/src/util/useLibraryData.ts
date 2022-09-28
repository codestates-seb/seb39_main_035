import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { Books } from '../types/basic';

type bookStatus = 'YET' | 'ING' | 'DONE';
interface BookListItem extends Books {
  bookId: number;
}
const useLibraryData = (pageNumber: number, bookStatus: bookStatus) => {
  const { token } = useSelector((state: RootState) => state.user);
  const [bookList, setBookList] = useState<BookListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(false);

  // useEffect(() => {
  //   setBookList([]);
  // }, [bookStatus, pageNumber]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/books/library', {
        headers: {
          Authorization: token,
        },
        params: {
          page: pageNumber,
          size: 3,
          bookStatus: bookStatus,
        },
      })
      .then((res) => {
        setBookList([...res.data.item]); //기존 불러온 데이터 + 중복값 삭제(새로 불러온 데이터 )
        setHasMoreData(pageNumber < res.data.pageInfo.totalPages);
        setIsLoading(false);
        console.log(res.data.pageInfo);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
  }, [bookStatus, hasMoreData, pageNumber]);

  return { isLoading, error, bookList, hasMoreData };
};

export default useLibraryData;
