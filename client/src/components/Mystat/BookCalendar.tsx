import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { CalendarItem } from '../../stores/stat/statSlice';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import dayjs from 'dayjs';

const BookCalendar = () => {
  const { calendarList } = useSelector((state: RootState) => state.stat);
  const [mark, setMark] = useState<CalendarItem[]>([]);

  useEffect(() => {
    if (calendarList.length > 0) {
      const transformList = calendarList.filter(
        (v, i) =>
          calendarList.findIndex((x) =>
            dayjs(x.readEndDate).isSame(v.readEndDate, 'day')
          ) === i
      );
      setMark(transformList);
    }
  }, [calendarList]);

  return (
    <CalendarContainer>
      <Calendar
        minDetail='month'
        maxDetail='month'
        formatDay={(locale, date) => dayjs(date).format('DD')}
        tileContent={({ date }) => {
          const dateObj = mark.find(
            (x) =>
              dayjs(x.readEndDate).format('YYYY-MM-DD') ===
              dayjs(date).format('YYYY-MM-DD')
          );
          return dateObj ? (
            <ReadEndDate cover={dateObj.cover}></ReadEndDate>
          ) : null;
        }}
      />
    </CalendarContainer>
  );
};

export default BookCalendar;

const ReadEndDate = styled.div<{ cover: string }>`
  background-image: ${(props) => `url(${props.cover})`};
  background-size: cover;
  display: block;
  width: 100%;
  height: 100%;
`;
const CalendarContainer = styled.div`
  .react-calendar {
    width: 100%;
    background: white;
    border: 1px solid #a0a096;
    line-height: 1.125em;
    border-radius: 10px;
    border: none;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: 18px;
  }
  .react-calendar__navigation button:disabled {
    color: black;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    /* text-transform: uppercase; */
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 1px;
    background: none;
    text-align: center;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media screen and (max-width: 500px) {
      height: 100px;
    }
    @media screen and (max-width: 390px) {
      height: 80px;
    }
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  /* .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  } */
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;
