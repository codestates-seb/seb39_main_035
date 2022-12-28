import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0.9rem 0.75rem 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  min-width: 355px;
`;
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
