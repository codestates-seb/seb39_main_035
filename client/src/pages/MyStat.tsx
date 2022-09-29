import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Boxcontainer from '../components/BoxContainer';
import Calendar from '../components/Calendar';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { getAbandonData, getCalendarData } from '../stores/stat/statSlice';
import { AppDispatch, RootState } from '../stores/store';
import Carousel from '../components/Carousel';

const MyStat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess, calendar, abandon } = useSelector(
    (state: RootState) => state.stat
  );

  useEffect(() => {
    dispatch(getCalendarData(1));
    // dispatch(getAbandonData(1));
  }, [dispatch, getCalendarData]);
  console.log(calendar);

  return (
    <Layout>
      <PageTitle title='나의 독서 통계 보기' />
      <Boxcontainer containerTitle='📓 잊고 지낸 나의 책'>
        <Carousel>
          <p>1</p>
        </Carousel>
      </Boxcontainer>
      <Boxcontainer containerTitle='🗓 독서 달력'>
        <Calendar calendar={calendar} />
      </Boxcontainer>
    </Layout>
  );
};

export default MyStat;
