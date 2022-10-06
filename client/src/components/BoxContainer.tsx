import styled from 'styled-components';

interface BoxContainerProps {
  containerTitle?: string;
  children: React.ReactNode;
}

const Boxcontainer = ({ containerTitle, children }: BoxContainerProps) => {
  return (
    <>
      {containerTitle && <Title>{containerTitle}</Title>}
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Boxcontainer;

const Title = styled.h1`
  font-size: 22px;
  margin: 15px 0;
  margin-left: 15px;
`;

const Wrapper = styled.section`
  box-shadow: ${(props) => props.theme.colors.boxShadow};
  border: ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 30px;
  font-size: 18px;
`;
