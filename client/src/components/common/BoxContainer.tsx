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
  font-size: 1.3rem;
  margin: 1rem 0;
  margin-left: 1rem;
`;

const Wrapper = styled.section`
  box-shadow: ${(props) => props.theme.colors.boxShadow};
  border: ${(props) => props.theme.colors.border};
  border-radius: 0.6rem;
  padding: 1.9rem;
  font-size: 1.1rem;
`;
