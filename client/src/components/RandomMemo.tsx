import React from 'react';
import { MemoResponse } from '../types/basic';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

interface RandomMemoProps {
  memo: MemoResponse;
}
const RandomMemo = () => {
  useSelector((state: RootState) => state.stat);
  const { memo } = useSelector((state: RootState) => state.memo);
  return <div>{memo.memoContent}</div>;
};

export default RandomMemo;

// 클릭 시 해당 책 상세페이지로 가기
