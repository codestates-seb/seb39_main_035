import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import BoxContainer from '../components/BoxContainer';
import axios from 'axios';
import { useAppSelector } from '../stores/store';
import { RootState } from '../stores/store';
import { useAppDispatch } from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { persistor } from '..';

type Member = {
  email: string;
  name: string;
};

const InfoTitle = styled.h1`
  margin-bottom: 5px;
`;
const InfoText = styled.p`
  text-align: center;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
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
  const navigate = useNavigate();

  const useAuthorization = useAppSelector(
    (state: RootState) => state.user.Authorization
  );
  const [editMode, setEditMode] = useState(false);
  const [memberInfo, setMemberInfo] = useState<Member>({
    email: '',
    name: '',
  });

  // 초기화 함수
  const purge = async () => {
    await persistor.purge();
  };

  const getMembersMe = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + '/members/me',
        {
          headers: {
            Authorization: useAuthorization,
          },
          withCredentials: true,
        }
      );
      console.log(response);
      setMemberInfo({
        email: response.data.email,
        name: response.data.name,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message:', error.message);
      } else {
        console.log('unexpected error:', error);
        return 'An unexpected error occurred';
      }
    }
  };
  useEffect(() => {
    getMembersMe();
  }, []);
  return (
    <Layout>
      <PageTitle title='마이 페이지' />
      {editMode ? (
        <BoxContainer>
          <InfoTitle>editmode</InfoTitle>
          <Button color='skyblue' onClick={() => setEditMode(false)}>
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
            <Button
              color='pink'
              onClick={async () => {
                await navigate('/');
                await setTimeout(() => purge(), 200);
              }}
            >
              로그아웃
            </Button>
          </ButtonContainer>
        </BoxContainer>
      )}
    </Layout>
  );
};

export default Mypage;
