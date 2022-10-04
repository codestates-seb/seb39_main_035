import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
  width: 300px;

  h1 {
    /* height: 100px; */
    display: flex;
  }

  h1 span {
    position: relative;
    top: 20px;
    display: inline-block;
    animation: bounce 0.9s ease infinite alternate;
    font-family: 'RIDIBatang', cursive;
    font-size: 80px;
    color: var(--misty-rose);
    text-shadow: 0 1px 0 #ffbfc5, 0 2px 0 #ffbfc5, 0 3px 0 #ffbfc5,
      0 4px 0 #ffbfc5, 0 5px 0 #ffbfc5, 0 6px 0 transparent, 0 7px 0 transparent,
      0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
  }

  h1 span:nth-child(2) {
    animation-delay: 0.1s;
  }
  h1 span:nth-child(3) {
    animation-delay: 0.2s;
  }
  h1 span:nth-child(4) {
    animation-delay: 0.3s;
  }
  h1 span:nth-child(5) {
    animation-delay: 0.4s;
  }
  h1 span:nth-child(6) {
    animation-delay: 0.5s;
  }
  h1 span:nth-child(7) {
    animation-delay: 0.6s;
  }
  h1 span:nth-child(8) {
    animation-delay: 0.7s;
  }

  @keyframes bounce {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #ffbfc5, 0 2px 0 #ffbfc5, 0 3px 0 #ffbfc5,
        0 4px 0 #ffbfc5, 0 5px 0 #ffbfc5, 0 6px 0 #ffbfc5, 0 7px 0 #ffbfc5,
        0 8px 0 #ffbfc5, 0 9px 0 #ffbfc5, 0 50px 25px rgba(0, 0, 0, 0.2);
    }
  }
`;

// 로그인, 회원가입 버튼
export const SignBtn = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: black;
  }
`;

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>
        <span>S</span>
        <span>E</span>
        <span>O</span>
        <span>L</span>
        <span>L</span>
        <span>E</span>
        <span>M</span>
      </h1>
      <SignBtn>
        <Button color='mint' onClick={() => navigate('/members/sign-in')}>
          로그인
        </Button>
        <Button color='mint' onClick={() => navigate('/members/sign-up')}>
          회원가입
        </Button>
      </SignBtn>
    </Container>
  );
};

export default Landing;
