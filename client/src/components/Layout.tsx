import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 15px 12px 20px 12px;
  display: flex;
  flex-direction: column;
`;
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
