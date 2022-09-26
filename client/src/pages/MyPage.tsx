import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import BoxContainer from '../components/BoxContainer';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, reset } from '../stores/user/userSlice';
import { AppDispatch, RootState } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { persistor } from '..';
import { toast } from 'react-toastify';
import EditUserInfo from '../components/EditUserInfo';

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    } else {
      navigate('/');
    }
    dispatch(reset());
  }, [isLoggedIn, dispatch]);

  const purge = async () => {
    await persistor.purge();
  };
  const handleLogout = async () => {
    try {
      toast.success('로그아웃 되었습니다.');
      await navigate('/');
      await setTimeout(() => purge(), 200);
    } catch (error: any) {
      toast.error(error);
    }
  };
  const exitEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <Layout>
      <PageTitle title='마이 페이지' />
      {editMode ? (
        <EditUserInfo exitEditMode={exitEditMode} />
      ) : (
        <BoxContainer containerTitle='회원정보 조회'>
          <InfoTitle>이름</InfoTitle>
          <InfoText>{user.name}</InfoText>
          <InfoTitle>E-mail</InfoTitle>
          <InfoText>{user.email}</InfoText>
          <ButtonContainer>
            <Button color='mint' onClick={exitEditMode}>
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

export const InfoTitle = styled.h1`
  margin-bottom: 5px;
`;
export const InfoText = styled.p`
  text-align: center;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  height: 40px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  button {
    margin: 0px;
  }
`;
