import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { deleteMemo } from '../stores/memo/memoSlice';
import { MemoResponse } from '../types/basic';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface MemoItemProps {
  memo: MemoResponse;
}

const MemoItem = ({ memo }: MemoItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async () => {
    await dispatch(deleteMemo(memo.memoId));
    // 삭제하고 상세페이지에서 다시 get 요청이 이루어져야됨 ....
  };

  const handleEdit = () => {
    navigate(`/memo/${memo.memoId}`, { state: memo });
  };

  return (
    <Wrapper>
      <p>{memo.memoBookPage}</p>
      <p>{memo.memoContent}</p>
      <p>{memo.memoType}</p>
      <Button color='gray' onClick={handleEdit}>
        수정하기
      </Button>
      <Button color='gray' onClick={handleDelete}>
        삭제하기
      </Button>
    </Wrapper>
  );
};

export default MemoItem;

const Wrapper = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
  border-radius: 5px;
  padding: 30px;
  font-size: 18px;
`;
