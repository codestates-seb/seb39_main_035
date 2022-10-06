import React from 'react';
import styled from 'styled-components';
import { MemoBookDetail } from '../types/basic';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useCompareDate from '../util/useCompareDate';

interface MemoBoxContainerProps {
  memoBookPage: number;
  memoContent: string;
  createdAt: string;
  updatedAt: string;
}

const MemoBoxContainer = ({
  memoBookPage,
  memoContent,
  createdAt,
  updatedAt,
}: MemoBoxContainerProps) => {
  const { date } = useCompareDate(createdAt, updatedAt);
  return (
    <Wrapper>
      <MemoBoxHeader>
        <span>{memoBookPage} page</span>
        <span>{date}</span>
      </MemoBoxHeader>
      <Viewer initialValue={memoContent} />
    </Wrapper>
  );
};

export default MemoBoxContainer;

const Wrapper = styled.div`
  border: 1px solid rgba(0 0 0 / 20%);
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  line-height: 1.4rem;
  height: 22rem;
  overflow: scroll;
`;

const MemoBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
