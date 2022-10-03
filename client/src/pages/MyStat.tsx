import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Boxcontainer from '../components/BoxContainer';
import BookCalendar from '../components/BookCalendar';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { getAbandonData, getCalendarData } from '../stores/stat/statSlice';
import { AppDispatch, RootState } from '../stores/store';
import Carousel from '../components/Carousel';
import BookCoverItem from '../components/BookCoverItem';
import { getRandomMemo } from '../stores/memo/memoSlice';
import MemoItem from '../components/MemoItem';
import AbandonBooks from '../components/AbandonBooks';


const MyStat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess, calendar, abandon } = useSelector(
    (state: RootState) => state.stat
  );
  const { memo } = useSelector((state: RootState) => state.memo);

  useEffect(() => {
    // dispatch(getCalendarData(1));
    // dispatch(getAbandonData(1));
    // dispatch(getRandomMemo());
  }, [dispatch]);

  return (
    <Layout>
      <PageTitle title='나의 독서 통계 보기' />
      <Boxcontainer containerTitle='📝 랜덤 메모'>
        <MemoItem memo={memo} />
      </Boxcontainer>
      <Boxcontainer containerTitle='📓 잊고 지낸 나의 책'>
        <AbandonBooks />
      </Boxcontainer>
      <Boxcontainer containerTitle='🗓 독서 달력'>
        <BookCalendar calendarList={calendar} />
      </Boxcontainer>
    </Layout>
  );
};

export default MyStat;
