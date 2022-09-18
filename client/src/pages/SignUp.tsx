import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Pretendard-Regular';

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--light-blue);
    padding: 1.5rem 2rem;
    border: 2px solid #ffffff;
    border-radius: 0.25rem;
  }
  // 로그인하기 버튼
  button {
    background-color: var(--misty-rose);
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    width: 100%;
    margin-bottom: 0.5rem;
    font-family: 'Pretendard-Regular';

    &:hover {
      background-color: var(--pink);
      cursor: pointer;
    }
  }
  // 회원가입 링크
  a {
    font-size: 0.5rem;
    text-decoration: none;
  }
`;

export const FormWrapper = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }
  input {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);

    &::placeholder {
      font-size: 0.8rem;
      font-family: 'Pretendard-Regular';
    }
  }
`;

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // typescript: handling form onSubmit event
  const submitSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 막기
    event.preventDefault();

    // do something
    alert(name);
  };
  return (
    <Container>
      <form onSubmit={submitSignIn}>
        <FormWrapper>
          <label htmlFor='userName'>이름</label>
          <input
            id='userName'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='이름을 입력해주세요.'
          ></input>
        </FormWrapper>

        <FormWrapper>
          <label htmlFor='userEmail'>이메일</label>
          <input
            id='userEmail'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일을 입력해주세요.'
          ></input>
        </FormWrapper>

        <FormWrapper>
          <label htmlFor='password'>비밀번호</label>
          <input
            id='password'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
          ></input>
        </FormWrapper>

        <FormWrapper>
          <label htmlFor='passwordConfirm'>비밀번호 확인</label>
          <input
            id='passwordConfirm'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
          ></input>
        </FormWrapper>

        <button type='submit' className='signInBtn'>
          회원 가입하기
        </button>
        <Link to='/members/sign-in'>이미 회원이신가요?</Link>
      </form>
    </Container>
  );
};

export default SignUp;
