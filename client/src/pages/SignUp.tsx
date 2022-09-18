import React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular';
  // CSS 중앙 정렬
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
export const ErrMsg = styled.div`
  color: #ea1a7f;
  margin-bottom: 0.5rem;
  font-size: 0.6rem;
`;

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setconfirmPw] = useState('');
  const [errData, setErrorData] = useState({
    name: '',
    email: '',
    pw: '',
    confirmPw: '',
  });

  // typescript: handling form onSubmit event
  const submitSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 막기
    event.preventDefault();

    // do something
    alert(name);
  };

  // autoFocus 기능 구현
  // typescript useRef 에러 해결 => optional chaining(?.)기법 사용
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    // input.focus()
    inputRef.current?.focus();
  });

  // 이메일 유효성 검사
  const EMAIL_REGEX = new RegExp(
    '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
  );
  // 비밀번호 유효성 검사
  const PW_REGEX = new RegExp(
    '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$'
  );

  const checkRegex = (input: any) => {
    let result;
    const inputId = input.id;
    console.log(inputId);
    const inputValue = input.value;
    console.log(inputValue.length);
    if (inputValue.length === 0) {
      result = '필수 정보입니다.';
    } else {
      switch (inputId) {
        case 'name':
          result = true;
          break;
        case 'email':
          result = EMAIL_REGEX.test(inputValue)
            ? true
            : '이메일 형식에 맞게 작성해주세요.';
          console.log('inputId:', result);
          break;
        case 'pw':
          result = PW_REGEX.test(inputValue)
            ? true
            : '6자 이상 영문 대 소문자, 숫자와 특수기호만 사용가능합니다.';
          console.log('pw:', result);
          break;
        case 'confirmPw':
          result = inputValue === pw ? true : '비밀번호가 일치하지 않습니다.';
          console.log('confirmPw:', result);
          break;
        default:
          return;
      }
    }
    console.log(result);
    setErrorData({ ...errData, [inputId]: result });
    console.log('errData:', errData);
  };
  return (
    <Container>
      <form onSubmit={submitSignIn}>
        <FormWrapper>
          <label htmlFor='name'>이름</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='이름을 입력해주세요.'
            autoFocus={true}
            onBlur={(e) => checkRegex(e.target)}
          />
          <ErrMsg>{errData.name}</ErrMsg>
        </FormWrapper>

        <FormWrapper>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일을 입력해주세요.'
            onBlur={(e) => checkRegex(e.target)}
          />
          <ErrMsg>{errData.email}</ErrMsg>
        </FormWrapper>

        <FormWrapper>
          <label htmlFor='pw'>비밀번호</label>
          <input
            id='pw'
            type='password'
            value={pw}
            placeholder='비밀번호를 입력해주세요.'
            onChange={(e) => setPw(e.target.value)}
            onBlur={(e) => checkRegex(e.target)}
          />
          <ErrMsg>{errData.pw}</ErrMsg>
        </FormWrapper>

        <FormWrapper>
          <label htmlFor='confirmPw'>비밀번호 확인</label>
          <input
            id='confirmPw'
            type='password'
            value={confirmPw}
            placeholder='비밀번호를 입력해주세요.'
            onChange={(e) => setconfirmPw(e.target.value)}
            onBlur={(e) => checkRegex(e.target)}
          />
          <ErrMsg>{errData.confirmPw}</ErrMsg>
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
