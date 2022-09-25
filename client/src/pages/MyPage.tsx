import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import BoxContainer from '../components/BoxContainer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { persistor } from '..';
import { User } from '../types/basic';
import { toast } from 'react-toastify';

// interface Member {
//   email: string;
//   name: string;
// }
interface Member extends User {
  confirmPassword?: string;
}

const InfoTitle = styled.h1`
  margin-bottom: 5px;
`;
const InfoText = styled.p`
  text-align: center;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  height: 40px;
`;

const InputEdit = styled.input`
  text-align: center;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  button {
    margin: 0px;
  }
`;

const Mypage = () => {
  const [editMode, setEditMode] = useState(false);
  const [memberInfo, setMemberInfo] = useState<Member>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const { token, isLoggedIn } = useSelector((state: RootState) => state.user);

  const getUserInfo = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE_URL + '/members/me',
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setMemberInfo({ ...memberInfo, ...data });
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      getUserInfo();
    }
  }, [isLoggedIn, navigate]);

  const purge = async () => {
    await persistor.purge();
  };
  const handleLogout = async () => {
    try {
      await navigate('/');
      await setTimeout(() => purge(), 200);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberInfo({
      ...memberInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleEdit = async () => {
    const PW_REGEX = new RegExp(
      '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$'
    );
    if (!PW_REGEX.test(memberInfo.password!)) {
      toast.error('6자 이상 영문 대 소문자, 숫자와 특수기호만 사용가능합니다.');
      return;
    }
    if (memberInfo.password !== memberInfo.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다');
      return;
    }
    const editUserData = {
      name: memberInfo.name,
      password: memberInfo.password,
    };
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_API_BASE_URL + '/members/me',
        editUserData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data);
      setEditMode(false);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <PageTitle title='마이 페이지' />
      {editMode ? (
        <BoxContainer>
          <InfoTitle>이름</InfoTitle>
          <InputEdit
            name='name'
            value={memberInfo.name}
            onChange={handleChange}
          />
          <InfoTitle>비밀번호</InfoTitle>
          <InputEdit
            name='password'
            type='password'
            value={memberInfo.password}
            onChange={handleChange}
          />
          <InfoTitle>비밀번호 확인</InfoTitle>
          <InputEdit
            name='confirmPassword'
            type='password'
            value={memberInfo.confirmPassword}
            onChange={handleChange}
          />
          <Button color='skyblue' onClick={handleEdit}>
            저장하기
          </Button>
        </BoxContainer>
      ) : (
        <BoxContainer>
          <InfoTitle>이름</InfoTitle>
          <InfoText>{memberInfo.name}</InfoText>
          <InfoTitle>E-mail</InfoTitle>
          <InfoText>{memberInfo.email}</InfoText>
          <ButtonContainer>
            <Button color='mint' onClick={() => setEditMode(true)}>
              수정하기
            </Button>
            <Button color='pink' onClick={handleLogout}>
              로그아웃
            </Button>
          </ButtonContainer>
        </BoxContainer>
      )}
    </Layout>
  );
};

export default Mypage;
