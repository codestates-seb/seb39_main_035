import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/1.png';
import { TbBooks, TbCalendarStats } from 'react-icons/tb';
import { BiBookHeart } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { GiArchiveResearch } from 'react-icons/gi';

const HeaderWrapper = styled.header`
  background-color: #f9f9f9;
  height: 60px;
  padding: 0 12px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgb(32 33 36 / 10%);
`;

const Logo = styled.div`
  height: 100%;
  margin: auto;
  cursor: pointer;
  img {
    height: 60px;
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  height: 100%;

  svg {
    cursor: pointer;
    padding: 10px auto;
    font-size: 28px;
    color: #b3dbd8;
    margin: 0 10px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <HeaderWrapper>
        {isLogin && (
          <Logo onClick={() => navigate('/')}>
            <img src={logo} alt='logo_icon' />
          </Logo>
        )}
        {!isLogin && (
          <>
            <Logo onClick={() => navigate('/books/library')}>
              <img src={logo} alt='logo_icon' />
            </Logo>
            <Menu>
              <TbBooks onClick={() => navigate('/books/library')} />
              <BiBookHeart />
              <GiArchiveResearch />
              <TbCalendarStats />
              <BsPersonCircle />
            </Menu>
          </>
        )}
      </HeaderWrapper>
    </>
  );
};

export default Header;
