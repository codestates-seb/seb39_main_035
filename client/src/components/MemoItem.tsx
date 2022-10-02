import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteMemo } from '../stores/memo/memoSlice';
import { MemoResponse } from '../types/basic';
import Button from './Button';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface MemoItemProps {
  memo: MemoResponse;
}

const MemoItem = ({ memo }: MemoItemProps) => {
  dayjs.locale('ko');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdated, setIsUpdated] = useState(false);

  const createDate = dayjs(memo.createdAt).format('YYYY.MM.DD A HH:mm');
  const updateDate = dayjs(memo.updatedAt).format('YYYY.MM.DD A HH:mm');

  useEffect(() => {
    if (dayjs(memo.updatedAt).diff(dayjs(memo.createdAt))) {
      setIsUpdated(true);
    }
  }, [memo]);

  // console.log(dayjs(memo.updatedAt).diff(dayjs(memo.createdAt))); // 수정이 안되어 있으면 0, 수정 된 적 있으면 양수

  const memoTypeList = [
    { typeValue: 'BOOK_CONTENT', typeText: '책 속 문장' },
    { typeValue: 'SUMMARY', typeText: '책 내용 요약' },
    { typeValue: 'THOUGHT', typeText: '생각' },
    { typeValue: 'QUESTION', typeText: '질문' },
  ];

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteMemo(memo.memoId));
    // 삭제하고 상세페이지에서 다시 get 요청이 이루어져야됨 ....
  };

  const handleEdit = () => {
    navigate(`/memo/${memo.memoId}`, { state: memo });
  };

  return (
    <Wrapper onClick={handleEdit}>
      <PageContainter>{'p.' + memo.memoBookPage}</PageContainter>
      <InfoContainer>
        {!isUpdated && <p>{createDate}</p>}
        {isUpdated && <p>{updateDate + '수정날짜 표시'}</p>}
        <Type>{memo.memoType}</Type>
      </InfoContainer>
      <Content>{memo.memoContent}</Content>
      <Button color='gray' onClick={handleDelete}>
        삭제
      </Button>
    </Wrapper>
  );
};

export default MemoItem;

const Wrapper = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
  border-radius: 5px;
  padding: 1rem;
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
