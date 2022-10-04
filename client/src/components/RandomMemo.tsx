import React from 'react';
import styled from 'styled-components';
import { MemoResponse } from '../types/basic';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useCompareDate from '../util/useCompareDate';

interface RandomMemoProps {
  memo: MemoResponse;
}
const RandomMemo = () => {
  useSelector((state: RootState) => state.stat);
  const { memo } = useSelector((state: RootState) => state.memo);
  const { date } = useCompareDate(memo.createdAt, memo.updatedAt);

  return (
    <Wrapper>
      <p>{date}</p>
      <Viewer initialValue={memo.memoContent} />
    </Wrapper>
  );
};

export default RandomMemo;

// 클릭 시 해당 책 상세페이지로 가기(bookId가 없으면 못가는거구만! )
// 책, 메모페이지

const Wrapper = styled.div`
  background-color: white;
  padding: 1rem;
`;
