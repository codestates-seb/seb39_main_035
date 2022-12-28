import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useCompareDate from '../../hooks/useCompareDate';
import useFindTypeText from '../../hooks/useFindTypeText';

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
  border-radius: 0.3rem;
  color: ${(props) => props.fontColor};
  .toastui-editor-contents {
    font-size: 1rem;
    font-family: 'RIDIBatang';
    margin-top: 1rem;
    margin-bottom: 1rem;
    p {
      color: ${(props) => props.fontColor};
    }
  }
`;

const MemoInfo = styled.div`
  text-align: right;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
`;
