import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../stores/store';
import { useAppDispatch } from '../stores/store';
import { loginAccount } from '../stores/user/userSlice';
import { RootState } from '../stores/store';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
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
    box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
  }

  // 로그인하기 버튼
  button {
    background-color: var(--misty-rose);
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--clear-day);
    border-radius: 0.25rem;
    width: 100%;
    margin-bottom: 0.5rem;
    color: black;

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
    font-size: 14px;
    line-height: 20px;
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
`;

const SignIn = (): JSX.Element => {
  // redux-toolkit 활용 코드
  const userEmail = useAppSelector((state: RootState) => state.user.email);
  const userPassword = useAppSelector(
    (state: RootState) => state.user.password
  );
  const dispatch = useAppDispatch();

  // 기존 코드
  const navigate = useNavigate();
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState(userPassword);
  const [errData, setErrorData] = useState({
    email: '',
    pw: '',
  });

  // typescript: handling form onSubmit event
  const submitSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 막기
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/login',
        { email: email, password: password },
        { withCredentials: true }
      );
      dispatch(
        loginAccount({
          Authorization: `${response.headers.authorization}`,
          email: email,
          password: password,
        })
      );
      navigate('/books/library');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message:', error.message);
      } else {
        console.log('unexpected error:', error);
        return 'An unexpected error occurred';
      }
    }
  };

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
    } else
      switch (inputId) {
        case 'email':
          result = EMAIL_REGEX.test(inputValue)
            ? true
            : '이메일 형식에 맞게 작성해주세요.';
          break;
        case 'pw':
          result = PW_REGEX.test(inputValue)
            ? true
            : '6자 이상 영문 대 소문자, 숫자와 특수기호만 사용가능합니다.';
          break;
        default:
          return;
      }
    setErrorData({ ...errData, [inputId]: result });
  };

  return (
    <Container>
      <form onSubmit={submitSignIn}>
        <FormWrapper>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일을 입력해주세요.'
            autoFocus={true}
            onBlur={(e) => checkRegex(e.target)}
          />
          <ErrMsg>{errData.email}</ErrMsg>
        </FormWrapper>
        <FormWrapper>
          <label htmlFor='pw'>비밀번호</label>
          <input
            id='pw'
            type='password'
            value={password}
            placeholder='비밀번호를 입력해주세요.'
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => checkRegex(e.target)}
          />
          <ErrMsg>{errData.pw}</ErrMsg>
        </FormWrapper>

        <button type='submit' className='signInBtn'>
          로그인하기
        </button>

        <Link to='/members/sign-up'>아직 회원이 아니신가요?</Link>
      </form>
    </Container>
  );
};

export default SignIn;
