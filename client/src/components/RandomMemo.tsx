import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useCompareDate from '../util/useCompareDate';
import useFindTypeText from '../util/useFindTypeText';

const RandomMemo = () => {
  const { memo } = useSelector((state: RootState) => state.memo);
  const { date } = useCompareDate(memo.createdAt, memo.updatedAt);
  const { typeText } = useFindTypeText(memo.memoType);
  const { imgUrl, fontColor } = useSelector((state: RootState) => state.memobg);

  return (
    <Wrapper imgUrl={imgUrl} fontColor={fontColor}>
      <Viewer initialValue={memo.memoContent} />
      <MemoInfo>{date}</MemoInfo>
      <MemoInfo>{memo.memoBookPage + 'p'}</MemoInfo>
      <MemoInfo>{typeText}</MemoInfo>
    </Wrapper>
  );
};

export default RandomMemo;

const Wrapper = styled.div<{ imgUrl: string; fontColor: string }>`
  background: ${(props) => `url(${props.imgUrl})`} center;
  padding: 1rem;
  border-radius: 5px;
  color: ${(props) => props.fontColor};
  .toastui-editor-contents {
    font-size: 16px;
    font-family: 'RIDIBatang';
    margin-top: 1em;
    margin-bottom: 1em;
    p {
      color: ${(props) => props.fontColor};
    }
  }
`;

const MemoInfo = styled.div`
  text-align: right;
  margin-bottom: 5px;
  font-size: 13px;
`;
