import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

type PageTitleProps = {
  title: string;
  path?: string;
  children?: React.ReactNode;
};

const Wrapper = styled.div`
  min-width: 355px;
  font-size: 26px;
  display: flex;
  color: #747474;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: solid 0.5px #747474;
  svg {
    cursor: pointer;
    margin-right: 20px;
    &:focus {
      color: var(--scandal);
    }
  }
`;
const StyledLink = styled(Link)`
  cursor: pointer;
  margin-right: 20px;
  text-decoration: none;
  color: #747474;

  &:focus {
    color: var(--scandal);
  }
`;

const PageTitle = ({ title, path, children }: PageTitleProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      {path && (
        <StyledLink to={path}>
          <AiOutlineArrowLeft />
        </StyledLink>
      )}
      {!path && <AiOutlineArrowLeft onClick={() => navigate(-1)} />}
      <h1>{title}</h1>
      {children}
    </Wrapper>
  );
};

export default PageTitle;
