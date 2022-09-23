import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import BoxContainer from '../components/BoxContainer';

interface Member {
  email: string;
  name: string;
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
    email: 'book@google.com',
    name: '독서왕 설렘이',
  });

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
            <Button color='pink' onClick={() => alert('로그아웃')}>
              로그아웃
            </Button>
          </ButtonContainer>
        </BoxContainer>
      )}
    </Layout>
  );
};

export default Mypage;
