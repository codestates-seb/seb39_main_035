import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import BoxContainer from '../components/BoxContainer';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../stores/user/userSlice';
import { AppDispatch, RootState } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { persistor } from '..';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';

interface Member {
  email: string;
  name: string;
  password?: string;
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
  height: 40px;
  font-size: 18px;
  color: var(--gray);
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
// 회원 탈퇴하기 버튼
const LinkDelete = styled.div`
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  text-decoration: none;
  color: #747474;
  text-align: right;

  &:hover {
    color: black;
  }
`;

const Mypage = () => {
  const [editMode, setEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const modalHandler = () => {
    setOpenModal(!openModal);
  };
  const [memberInfo, setMemberInfo] = useState<Member>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token, isLoggedIn, user } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      dispatch(getUserInfo());
      setMemberInfo({ ...memberInfo, ...user });
    }
  }, [isLoggedIn, navigate, editMode]);

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
      toast.error(
        '비밀번호는 6자 이상 영문 대 소문자, 숫자와 특수기호만 사용가능합니다.'
      );
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
      await axios.patch(
        process.env.REACT_APP_API_BASE_URL + '/members/me',
        editUserData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setEditMode(false);
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(process.env.REACT_APP_API_BASE_URL + '/members/me', {
        headers: {
          Authorization: token,
        },
      });
      toast.success('🥲 회원 탈퇴되었습니다');
      await navigate('/');
      await setTimeout(() => purge(), 200);
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
          <InfoTitle>E-mail</InfoTitle>
          <InfoText>{memberInfo.email}</InfoText>
          <InfoTitle>비밀번호 변경</InfoTitle>
          <InputEdit
            name='password'
            type='password'
            value={memberInfo.password}
            onChange={handleChange}
          />
          <InfoTitle>비밀번호 변경 확인</InfoTitle>
          <InputEdit
            name='confirmPassword'
            type='password'
            value={memberInfo.confirmPassword}
            onChange={handleChange}
          />
          <ButtonContainer>
            <Button color='skyblue' onClick={() => setEditMode(false)}>
              취소하기
            </Button>
            <Button color='mint' onClick={handleEdit}>
              저장하기
            </Button>
          </ButtonContainer>
          <LinkDelete onClick={modalHandler}>회원 탈퇴하기</LinkDelete>
          {openModal && (
            <Modal closeModal={modalHandler}>
              <p>🥲정말 탈퇴하시겠습니끼?</p>
              <ButtonContainer>
                <Button color='skyblue' onClick={modalHandler}>
                  취소하기
                </Button>
                <Button color='pink' onClick={handleDelete}>
                  탈퇴하기
                </Button>
              </ButtonContainer>
            </Modal>
          )}
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
