import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const useCompareDate = (createdAt: string, updatedAt: string) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [date, setDate] = useState<string>('');

  const timeZone = dayjs.tz.guess();
  const createDate = dayjs
    .utc(createdAt)
    .tz(timeZone)
    .format('YYYY.MM.DD A HH:mm');
  const updateDate = dayjs
    .utc(updatedAt)
    .tz(timeZone)
    .format('YYYY.MM.DD A HH:mm');

  useEffect(() => {
    if (dayjs(updatedAt).diff(dayjs(createdAt))) {
      setIsUpdated(true);
    }
  }, [updatedAt, createdAt]);

  useEffect(() => {
    if (isUpdated) {
      setDate(updateDate);
    } else {
      setDate(createDate);
    }
  }, [isUpdated, updateDate, createDate]);

  return { date };
};

export default useCompareDate;
