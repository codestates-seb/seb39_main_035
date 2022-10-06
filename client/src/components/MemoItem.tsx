import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteMemo } from '../stores/memo/memoSlice';
import { MemoResponse } from '../types/basic';
import { BsTrashFill } from 'react-icons/bs';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useCompareDate from '../util/useCompareDate';

interface MemoItemProps {
  memo: MemoResponse;
}

const MemoItem = ({ memo }: MemoItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { date } = useCompareDate(memo.createdAt, memo.updatedAt);

  const memoTypeList = {
    BOOK_CONTENT: '책 속 문장',
    SUMMARY: '책 내용 요약',
    THOUGHT: '생각',
    QUESTION: '질문',
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteMemo(memo.memoId));
  };

  const handleEdit = () => {
    navigate(`/memo/${memo.memoId}`, { state: memo });
  };

  return (
    <>
      <Wrapper onClick={handleEdit}>
        <InfoContainer>
          <PageContainter>{'p. ' + memo.memoBookPage}</PageContainter>
          <BsTrashFill onClick={handleDelete} />
        </InfoContainer>
        <InfoContainer>
          <p>{date}</p>
          <Type>{memo.memoType}</Type>
        </InfoContainer>
        <Viewer initialValue={memo.memoContent} />
      </Wrapper>
    </>
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
  .toastui-editor-contents {
    font-size: 18px;
  }
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
