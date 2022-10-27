import React, { useEffect } from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../stores/user/userSlice';
import { AppDispatch, RootState } from '../stores/store';
import 'react-toastify/dist/ReactToastify.css';

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
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    box-shadow: 0rem 0rem 0.25rem 0rem rgba(0 0 0 / 20%);
  }

  // 로그인하기 버튼
  button {
    background-color: var(--misty-rose);
    padding: 0.5rem 0.75rem;
    border: 0.063rem solid var(--clear-day);
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
    color: #747474;

    &:hover {
      color: black;
    }
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  input {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    outline-color: var(--scandal);
    width: 100%;
    font-family: 'Pretendard-Regular';

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
  word-wrap: break-word;
`;

const SignUp = () => {
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isError, isSuccess, isLoading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (isSuccess) {
      navigate('/members/sign-in');
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, dispatch]);

  // typescript: handling form onSubmit event
  const submitSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 막기
    event.preventDefault();

    // 회원가입 요청
    const userData = {
      name,
      email,
      password: pw,
    };

    if (!errData.confirmPw && !errData.email && !errData.name && !errData.pw) {
      dispatch(register(userData));
    }
  };
  // autoFocus 기능 구현
  // typescript useRef 에러 해결 => optional chaining(?.)기법 사용
  // but ref={inputRef}한 input를 제외한 다른 input이 선택되지 못하는 현상 발생.
  // input autofocus={true}로 기능 구현

  // const inputRef = useRef<HTMLInputElement>(null);
  // useLayoutEffect(() => {
  //   inputRef.current?.focus();
  // });

  // 이메일 유효성 검사
  const EMAIL_REGEX = new RegExp(
    '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
  );
  // 비밀번호 유효성 검사
  const PW_REGEX = new RegExp(
    '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$'
  );

  // 유효성 검사
  const checkRegex = (input: any) => {
    let result;
    const inputId = input.id;
    const inputValue = input.value;
    if (inputValue.length === 0) {
      result = '필수 정보입니다.';
    } else {
      switch (inputId) {
        case 'name':
          result = ''; // true에서 수정
          break;
        case 'email':
          result = EMAIL_REGEX.test(inputValue)
            ? ''
            : '이메일 형식에 맞게 작성해주세요.';
          break;
        case 'pw':
          result = PW_REGEX.test(inputValue)
            ? ''
            : '6자 이상 영문 대 소문자, 숫자와 특수기호만 사용가능합니다.';
          break;
        case 'confirmPw':
          result = inputValue === pw ? '' : '비밀번호가 일치하지 않습니다.';
          break;
        default:
          return;
      }
    }
    setErrorData({ ...errData, [inputId]: result });
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
            placeholder='이름'
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
            placeholder='이메일'
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
            placeholder='비밀번호'
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
            placeholder='비밀번호 확인'
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
