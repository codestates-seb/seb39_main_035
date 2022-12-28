import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import styled from 'styled-components';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import MemoItem from './MemoItem';

const MemoList = () => {
  const { bookDetail } = useSelector((state: RootState) => state.book);
  const { bookId, itemPage, memosList, memoCount } = bookDetail;
  const navigate = useNavigate();
  const handleAddMemo = () => {
    navigate('/memo', { state: { bookId, itemPage } });
  };

  return (
    <Wrapper>
      <BoxTitle>
        {memoCount ? <h1>내가 작성한 메모</h1> : <h1>📝 첫번째 메모 남기기</h1>}
        <Button color='skyblue' middleWidth onClick={handleAddMemo}>
          메모 작성하기
        </Button>
      </BoxTitle>
      {memosList.map((memo) => (
        <MemoItem key={memo.memoId} memo={memo} />
      ))}
    </Wrapper>
  );
};

export default MemoList;

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const BoxTitle = styled.div`
  width: 100%;
  margin-top: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.375rem;
    margin-left: 1rem;
    white-space: nowrap;
  }
`;
