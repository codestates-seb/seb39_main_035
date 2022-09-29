import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

type PageTitleProps = {
  title: string;
  children?: React.ReactNode;
};

const Wrapper = styled.div`
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
  }
`;

const PageTitle = ({ title, children }: PageTitleProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <AiOutlineArrowLeft onClick={() => navigate(-1)} />
      <h1>{title}</h1>
      {children}
    </Wrapper>
  );
};

export default PageTitle;
