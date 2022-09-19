import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  font-size: 26px;
  display: flex;
  color: #747474;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: solid 0.5px #747474;
  svg {
    cursor: pointer;
    margin-right: 20px;
  }
`;

type PageTitleProps = {
  title: string;
};
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <AiOutlineArrowLeft onClick={() => navigate(-1)} />
      <h1>{title}</h1>
    </Wrapper>
  );
};

export default PageTitle;
