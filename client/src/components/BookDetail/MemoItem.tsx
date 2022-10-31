import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteMemo } from '../../stores/memo/memoSlice';
import { MemoResponse } from '../../types/basic';
import { BsTrashFill } from 'react-icons/bs';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useCompareDate from '../../hooks/useCompareDate';
import useFindTypeText from '../../hooks/useFindTypeText';

interface MemoItemProps {
  memo: MemoResponse;
}

const MemoItem = ({ memo }: MemoItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { date } = useCompareDate(memo.createdAt, memo.updatedAt);
  const { typeText } = useFindTypeText(memo.memoType);

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
          <Type>{typeText}</Type>
        </InfoContainer>
        <Viewer initialValue={memo.memoContent} />
      </Wrapper>
    </>
  );
};

export default MemoItem;

const Wrapper = styled.div`
  box-shadow: ${(props) => props.theme.colors.boxShadow};
  border-radius: 0.3rem;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  cursor: pointer;
  .toastui-editor-contents {
    font-size: 1.1rem;
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
  text-align: center;
  background-color: var(--light-blue);
  width: 10rem;
  color: white;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
