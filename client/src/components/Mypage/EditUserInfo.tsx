import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { persistor } from '../..';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUserInfo } from '../../stores/user/userSlice';
import { AppDispatch, RootState } from '../../stores/store';
import { User } from '../../types/basic';
import { InfoTitle, InfoText, ButtonContainer } from '../../pages/MyPage';
import BoxContainer from '../common/BoxContainer';
import Button from '../common/Button';
import Modal from '../common/Modal';

interface Member extends User {
  confirmPassword?: string;
}

interface EditUserInfoProps {
  exitEditMode: () => void;
}

const EditUserInfo = ({ exitEditMode }: EditUserInfoProps) => {
  const [openModal, setOpenModal] = useState(false);
  const modalHandler = () => {
    setOpenModal(!openModal);
  };
  const [openPasswordInput, setOpenPasswordInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.user);
  const [memberInfo, setMemberInfo] = useState<Member>({
    email: user.email,
    name: user.name,
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberInfo({
      ...memberInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
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
      name: memberInfo.name!,
      password: memberInfo.password!,
    };

    dispatch(editUserInfo(editUserData));
    toast.success('회원 정보가 변경되었습니다');
    exitEditMode();
    setMemberInfo({ ...memberInfo, password: '', confirmPassword: '' });
  };

  const handleEditUsername = () => {
    const editUserData = {
      name: memberInfo.name!,
    };

    dispatch(editUserInfo(editUserData));
    toast.success('회원 정보가 변경되었습니다');
    exitEditMode();
    setMemberInfo({ ...memberInfo, password: '', confirmPassword: '' });
  };

  const purge = async () => {
    await persistor.purge();
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
    <BoxContainer containerTitle='회원정보 수정'>
      <InfoTitle>이름</InfoTitle>
      <InputEdit name='name' value={memberInfo.name} onChange={handleChange} />
      <InfoTitle>E-mail</InfoTitle>
      <InfoText onClick={() => toast.error('e-mail은 변경할 수 없습니다')}>
        {memberInfo.email}
      </InfoText>
      <LinkButton>
        <span onClick={() => setOpenPasswordInput(!openPasswordInput)}>
          비밀번호 변경하기
        </span>
      </LinkButton>
      {openPasswordInput && (
        <>
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
        </>
      )}
      <ButtonContainer>
        <Button color='skyblue' onClick={exitEditMode}>
          취소하기
        </Button>
        {openPasswordInput ? (
          <Button color='mint' onClick={handleEdit}>
            저장하기
          </Button>
        ) : (
          <Button color='mint' onClick={handleEditUsername}>
            저장하기
          </Button>
        )}
      </ButtonContainer>
      <LinkButton>
        <span onClick={modalHandler}>회원 탈퇴하기</span>
      </LinkButton>
      {openModal && (
        <Modal closeModal={modalHandler}>
          <p>🥲정말 탈퇴하시겠습니까?</p>
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
  );
};

export default EditUserInfo;

const InputEdit = styled.input`
  text-align: center;
  border: 1px solid var(--gray);
  border-radius: 0.6rem;
  padding: 0.6rem;
  margin-bottom: 0.6rem;
  width: 100%;
  height: 2.5rem;
  font-size: 1.125rem;
  color: var(--gray);
`;

// 회원 탈퇴하기 버튼
const LinkButton = styled.div`
  font-size: 0.875rem;
  width: 100%;
  margin-top: 1.25rem;
  text-decoration: none;
  color: #747474;
  text-align: right;
  > span:hover {
    color: ${(props) => props.theme.colors.font};
  }
  > span {
    cursor: pointer;
  }
`;

const ModalMessage = styled.p`
  margin-bottom: 0.6rem;
`;
