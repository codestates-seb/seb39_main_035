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
      <Viewer initialValue={memo.memoContent} />
      <MemoInfo>{date}</MemoInfo>
      <MemoInfo>{memo.memoBookPage + 'p'}</MemoInfo>
      <MemoInfo>{memo.memoType}</MemoInfo>
    </Wrapper>
  );
};

export default RandomMemo;

const Wrapper = styled.div`
  background-color: var(--light-blue);
  padding: 1rem;
  border-radius: 5px;
  .toastui-editor-contents {
    font-size: 16px;
    font-family: 'RIDIBatang';
    margin-top: 1em;
    margin-bottom: 1em;
  }
`;

const MemoInfo = styled.div`
  text-align: right;
  margin-bottom: 5px;
  font-size: 13px;
`;
