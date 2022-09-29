import { useState } from 'react';
import { CalendarItem } from '../stores/stat/statSlice';

interface CalendarProps {
  calendar: CalendarItem[];
}

const Calendar = ({ calendar }: CalendarProps) => {
  console.log(calendar);
  return <></>;
};

export default Calendar;
