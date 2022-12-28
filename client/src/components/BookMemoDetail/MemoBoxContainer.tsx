import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import styled from 'styled-components';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useCompareDate from '../../hooks/useCompareDate';
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
  const { imgUrl, fontColor } = useSelector((state: RootState) => state.memobg);
  const { date } = useCompareDate(createdAt, updatedAt);
  return (
    <Wrapper imgUrl={imgUrl} fontColor={fontColor}>
      <MemoBoxHeader fontColor={fontColor}>
        <span>{memoBookPage} page</span>
        <span>{date}</span>
      </MemoBoxHeader>
      <Viewer initialValue={memoContent} />
    </Wrapper>
  );
};

export default MemoBoxContainer;

const Wrapper = styled.div<{ imgUrl: string; fontColor: string }>`
  border: ${(props) => props.theme.colors.border};
  cursor: pointer;
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  line-height: 1.4rem;
  height: 30rem;
  overflow: scroll;
  background: ${(props) => `url(${props.imgUrl})`} center;
  .toastui-editor-contents {
    font-family: 'RIDIBatang';
    font-size: 18px;
    margin: 1rem 1.2rem;
    p {
      color: ${(props) => props.fontColor};
    }
  }
`;

const MemoBoxHeader = styled.div<{ fontColor: string }>`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.fontColor};
`;
