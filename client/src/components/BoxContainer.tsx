import styled from 'styled-components';

interface BoxContainerProps {
  containerTitle?: string;
  children: React.ReactNode;
}

const Title = styled.h1`
  font-size: 22px;
  margin: 15px 0;
`;

const Wrapper = styled.section`
  min-width: 300px;
  box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
  border-radius: 5px;
  padding: 30px;
  font-size: 18px;
`;

const Boxcontainer = ({ containerTitle, children }: BoxContainerProps) => {
  return (
    <>
      {containerTitle && <Title>{containerTitle}</Title>}
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Boxcontainer;
