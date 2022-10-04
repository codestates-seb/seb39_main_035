import { useEffect, useState } from 'react';
import { CalendarItem } from '../stores/stat/statSlice';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface CalendarProps {
  calendarList: CalendarItem[];
}

const BookCalendar = ({ calendarList }: CalendarProps) => {
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState<CalendarItem[]>([]);
  // //필요한가?.?
  useEffect(() => {}, [calendarList]);

  // 1. 중복된 날짜 제거
  if (calendarList.length > 0) {
    const transformList = calendarList.filter(
      (v, i) =>
        calendarList.findIndex((x) =>
          dayjs(x.readEndDate).isSame(v.readEndDate, 'day')
        ) === i
    );
  }

  return (
    <CalendarContainer>
      <Calendar
        onChange={setValue}
        value={value}
        minDetail='month'
        maxDetail='month'
        formatDay={(locale, date) => dayjs(date).format('DD')}
        // tileContent={({ date }) => {
        //   let html = [];
        //   if (
        //     mark.find(
        //       (x) =>
        //         dayjs(x.readEndDate).format('YYYY-MM-DD') ===
        //         dayjs(date).format('YYYY-MM-DD')
        //     )
        //   ) {
        //     html.push(<p>check</p>);
        //   }
        // }}
      />
    </CalendarContainer>
  );
};

export default BookCalendar;

const CalendarContainer = styled.div`
  .highlight {
    color: red;
  }
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
    text-transform: uppercase;
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
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 5px;
    background: none;
    text-align: center;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ffff76;
    /* background-image: url(https://res.cloudinary.com/drglem6rp/image/upload/v1664799652/k092835920_1.jpg);
    background-size: cover; */
  }
  /* .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  } */
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;
