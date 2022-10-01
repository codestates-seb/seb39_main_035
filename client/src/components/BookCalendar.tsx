import { useState } from 'react';
import { CalendarItem } from '../stores/stat/statSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface CalendarProps {
  calendarList: CalendarItem[];
}

const BookCalendar = ({ calendarList }: CalendarProps) => {
  const [value, setValue] = useState(new Date());
  const mark = ['2022-09-29T22:50:00', '2022-09-28T21:26:00'];

  console.log(dayjs('2022-09-29T22:50:00').format('DD-MM-YYYY'));
  return (
    <>
      <StyledCalendar onChange={setValue} value={value} />
    </>
  );
};

export default BookCalendar;

const StyledCalendar = styled(Calendar)`
  .highlight {
    background-color: red;
  }
`;
