import styled from 'styled-components';

export const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h1 {
    display: flex;
    line-height: 7.5rem;
  }

  h1 span {
    position: relative;
    top: 0.313rem;
    display: inline-block;
    animation: bounce 0.9s ease infinite alternate;
    font-family: 'RIDIBatang', cursive;
    font-size: 5rem;
    color: var(--misty-rose);
    text-shadow: 0 0.063rem 0 #ffbfc5, 0 0.125rem 0 #ffbfc5,
      0 0.188rem 0 #ffbfc5, 0 0.25rem 0 #ffbfc5, 0 0.313rem 0 #ffbfc5,
      0 0.375rem 0 transparent, 0 0.438rem 0 transparent, 0 0.5rem 0 transparent,
      0 0.563rem 0 transparent, 0 0.625rem 0.625rem rgba(0, 0, 0, 0.4);
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
      top: -0.313rem;
      text-shadow: 0 0.063rem 0 #ffbfc5, 0 0.125rem 0 #ffbfc5,
        0 0.188rem 0 #ffbfc5, 0 0.25rem 0 #ffbfc5, 0 0.313rem 0 #ffbfc5,
        0 0.375rem 0 #ffbfc5, 0 0.438rem 0 #ffbfc5, 0 0.5rem 0 #ffbfc5,
        0 0.563rem 0 #ffbfc5, 0 3.125rem 1.563rem rgba(0, 0, 0, 0.2);
    }
  }
`;

const Landing = () => {
  return (
    <Container>
      <h1>
        <span>나</span>
        <span>만</span>
        <span>의</span>
      </h1>
      <h1>
        <span>작</span>
        <span>은</span>
        <span>설</span>
        <span>렘</span>
      </h1>
    </Container>
  );
};

export default Landing;
