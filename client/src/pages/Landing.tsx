import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Pretendard-Regular';
  background-color: var(--light-blue);
  padding: 1.5rem 2rem;
  border: 2px solid #ffffff;
  border-radius: 0.25rem;
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
