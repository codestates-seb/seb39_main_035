import styled from 'styled-components';
import HorizontalContainer from '../components/Library/HorizontalContainer';
import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import useScrollTop from '../hooks/useScrollTop';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();
  useScrollTop();

  return (
    <Layout>
      <PageTitle title='서재' />
      <BookAddButton onClick={() => navigate('/books/search')}>
        <BsPlusSquare />
        <div className='noResults'>읽고 싶은 책을 추가해보세요 🤗</div>
      </BookAddButton>
      <HorizontalContainer title='읽고 있는 책' bookStatus='ING' />
      <HorizontalContainer title='읽고 싶은 책' bookStatus='YET' />
      <HorizontalContainer title='다 읽은 책' bookStatus='DONE' />
    </Layout>
  );
};

export default Library;

const BookAddButton = styled.div`
  display: flex;
  padding: 1.25rem;
  border-radius: 0.313rem;
  margin-bottom: 1.25rem;
  border: ${(props) => props.theme.colors.border};
  transition: transfrom 300ms ease-in;
  svg {
    margin-right: 1.875rem;
  }
  &:hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.colors.boxShadow};
    transform: translate(-0.1rem);
  }
`;
