import { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/1.png';
import { TbBooks, TbCalendarStats } from 'react-icons/tb';
import { BiBookHeart } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { GiArchiveResearch } from 'react-icons/gi';

const Wrapper = styled.header`
  height: 60px;
  padding: 0 12px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
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
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Wrapper>
      {isLogin && (
        <Logo>
          <img src={logo} alt='logo_icon' />
        </Logo>
      )}
      {!isLogin && (
        <>
          <Logo>
            <img src={logo} alt='logo_icon' />
          </Logo>
          <Menu>
            <TbBooks />
            <BiBookHeart />
            <GiArchiveResearch />
            <TbCalendarStats />
            <BsPersonCircle />
          </Menu>
        </>
      )}
    </Wrapper>
  );
};

export default Header;
