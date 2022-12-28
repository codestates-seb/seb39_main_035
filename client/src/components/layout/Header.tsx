import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import logo from '../../assets/1.png';
import { TbBooks, TbCalendarStats } from 'react-icons/tb';
import { BiBookHeart } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { GiArchiveResearch } from 'react-icons/gi';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrapper>
        {!isLoggedIn && (
          <>
            <Link to='/'>
              <Logo>
                <img src={logo} alt='logo_icon' />
              </Logo>
            </Link>
            <SignBtn>
              <Button color='mint' onClick={() => navigate('/members/sign-in')}>
                로그인
              </Button>
              <Button color='mint' onClick={() => navigate('/members/sign-up')}>
                회원가입
              </Button>
            </SignBtn>
          </>
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
              <StyledLink to='/books/memoBooks'>
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
  background-color: ${(props) => props.theme.colors.bg};
  height: 3.75rem;
  padding: 0 0.6rem;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) => props.theme.colors.boxShadow};
  z-index: 1;
  /* 추가 */
  min-width: 375px;
`;

const Logo = styled.div`
  height: 100%;
  margin: auto;
  cursor: pointer;
  img {
    height: 3.75rem;
    @media screen and (max-width: 390px) {
      height: 2.8rem;
    }
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
  border-radius: 0.3rem;
  text-align: center;
  padding: 0.3rem;
  text-decoration: none;
  &:hover {
    background-color: #ececec;
  }
  svg {
    cursor: pointer;
    padding: 0.6rem auto;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.icons};
  }
  p {
    font-size: 0.6rem;
    text-align: center;
    color: ${(props) => props.theme.colors.font};
    white-space: nowrap;
    @media screen and (max-width: 390px) {
      display: none;
    }
  }
`;
// 로그인, 회원가입 버튼
export const SignBtn = styled.div`
  display: flex;
  width: 15rem;
  margin-top: 0.6rem;
`;
