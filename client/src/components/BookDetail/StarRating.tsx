import styled from 'styled-components';
import { BsStarFill } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';

interface StarRatingProps {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
}

const Wrapper = styled.div`
  display: flex;
  width: 9.375rem;
  justify-content: space-between;
  .inactive {
    color: #c9c8c8;
  }
  .active {
    color: var(--pink);
  }
`;
const Star = styled(BsStarFill)`
  cursor: pointer;
  font-size: 1.375rem;
`;

const StarRating = ({ star, setStar }: StarRatingProps) => {
  const starArr = [1, 2, 3, 4, 5];

  return (
    <Wrapper>
      {starArr.map((score, index) => (
        <Star
          key={index}
          className={score <= star ? 'active' : 'inactive'}
          onClick={() => setStar(score)}
        />
      ))}
    </Wrapper>
  );
};

export default StarRating;
