import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import Button from '../components/common/Button';
import BoxContainer from '../components/common/BoxContainer';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, reset } from '../stores/user/userSlice';
import { AppDispatch, RootState } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { persistor } from '..';
import { toast } from 'react-toastify';
import EditUserInfo from '../components/Mypage/EditUserInfo';

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
  }, [isLoggedIn, dispatch, navigate]);

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
  margin-bottom: 0.4rem;
`;
export const InfoText = styled.p`
  text-align: center;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 0.6rem;
  margin-bottom: 0.6rem;
  height: 2.5rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
  button {
    margin: 0;
  }
`;
