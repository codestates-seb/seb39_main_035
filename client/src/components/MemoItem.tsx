import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteMemo } from '../stores/memo/memoSlice';
import { MemoResponse } from '../types/basic';
import { BsTrashFill } from 'react-icons/bs';
import Button from './Button';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

interface MemoItemProps {
  memo: MemoResponse;
}

const MemoItem = ({ memo }: MemoItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdated, setIsUpdated] = useState(false);

  const timeZone = dayjs.tz.guess();
  const createDate = dayjs
    .utc(memo.createdAt)
    .tz(timeZone)
    .format('YYYY.MM.DD A HH:mm');

  const updateDate = dayjs
    .utc(memo.updatedAt)
    .tz(timeZone)
    .format('YYYY.MM.DD A HH:mm');

  useEffect(() => {
    if (dayjs(memo.updatedAt).diff(dayjs(memo.createdAt))) {
      setIsUpdated(true);
    }
  }, [memo]);

  const memoTypeList = [
    { typeValue: 'BOOK_CONTENT', typeText: '책 속 문장' },
    { typeValue: 'SUMMARY', typeText: '책 내용 요약' },
    { typeValue: 'THOUGHT', typeText: '생각' },
    { typeValue: 'QUESTION', typeText: '질문' },
  ];

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteMemo(memo.memoId));
  };

  const handleEdit = () => {
    navigate(`/memo/${memo.memoId}`, { state: memo });
  };

  return (
    <Wrapper onClick={handleEdit}>
      <InfoContainer>
        <PageContainter>{'p.' + memo.memoBookPage}</PageContainter>
        <BsTrashFill onClick={handleDelete} />
      </InfoContainer>
      <InfoContainer>
        {isUpdated ? <p>{updateDate}</p> : <p>{createDate}</p>}
        <Type>{memo.memoType}</Type>
      </InfoContainer>
      <Content>{memo.memoContent}</Content>
    </Wrapper>
  );
};

export default MemoItem;

const Wrapper = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 18px;
  cursor: pointer;
  font-size: 1rem;
`;

const PageContainter = styled.div`
  border-radius: 1rem;
  background-color: var(--light-blue);
  width: 5rem;
  padding: 0.5rem;
  text-align: center;
  color: white;
`;

const Type = styled.div`
  padding: 0.5rem;
  opacity: 80%;
  text-align: center;
  background-color: var(--light-blue);
  width: 10rem;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Content = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
