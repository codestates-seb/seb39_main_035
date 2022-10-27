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
  font-size: 1.5rem;
  display: flex;
  color: ${(props) => props.theme.colors.font};
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  margin-bottom: 1.2rem;
  border-bottom: solid 0.5px #747474;
  svg {
    cursor: pointer;
    margin-right: 1.2rem;
    &:focus {
      color: var(--scandal);
    }
  }
`;
const StyledLink = styled(Link)`
  cursor: pointer;
  margin-right: 20px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.font};

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
