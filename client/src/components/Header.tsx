import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import logo from '../assets/1.png';
import { TbBooks, TbCalendarStats } from 'react-icons/tb';
import { BiBookHeart } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { GiArchiveResearch } from 'react-icons/gi';

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <>
      <HeaderWrapper>
        {!isLoggedIn && (
          <Link to='/'>
            <Logo>
              <img src={logo} alt='logo_icon' />
            </Logo>
          </Link>
        )}
        {isLoggedIn && (
          <>
            <Link to='/books/library'>
              <Logo>
                <img src={logo} alt='logo_icon' />
              </Logo>
            </Link>
            <Menu>
              <StyledLink to='/books/library'>
                <TbBooks />
                <p>나의 서재</p>
              </StyledLink>
              <StyledLink to='/books/recommend'>
                <BiBookHeart />
                <p>추천 책</p>
              </StyledLink>
              <StyledLink to='/'>
                <GiArchiveResearch />
                <p>나만의 작은책</p>
              </StyledLink>
              <StyledLink to='/mystat'>
                <TbCalendarStats />
                <p>독서 통계</p>
              </StyledLink>
              <StyledLink to='/mypage'>
                <BsPersonCircle />
                <p>마이 페이지</p>
              </StyledLink>
            </Menu>
          </>
        )}
      </HeaderWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  background-color: #f9f9f9;
  height: 60px;
  padding: 0 10px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
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
`;

const StyledLink = styled(Link)`
  border-radius: 5px;
  text-align: center;
  padding: 5px;
  text-decoration: none;
  &:hover {
    background-color: #ececec;
  }
  svg {
    cursor: pointer;
    padding: 10px auto;
    font-size: 24px;
    color: #b3dbd8;
  }
  p {
    font-size: 10px;
    text-align: center;
    color: var(--gray);
    white-space: nowrap;
    @media screen and (max-width: 500px) {
      /* display: none; */
    }
  }
`;
