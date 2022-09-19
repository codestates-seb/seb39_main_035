import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
`;

// 캐러셀
export const Carousel = styled.div`
  margin-bottom: 10px;
`;

// 로그인, 회원가입 버튼
export const SignBtn = styled.div`
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: black;
  }
  button {
    background-color: var(--misty-rose);
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    font-family: 'Pretendard-Regular';

    &:hover {
      background-color: var(--pink);
      cursor: pointer;
    }
  }
`;

const Landing = (): JSX.Element => {
  return (
    <Container>
      <Carousel>여기는 캐러셀 영역입니다.</Carousel>
      <SignBtn>
        <button>
          <Link to='/members/sign-in'>로그인</Link>
        </button>
        <button>
          <Link to='/members/sign-up'>회원가입</Link>
        </button>
      </SignBtn>
    </Container>
  );
};

export default Landing;
