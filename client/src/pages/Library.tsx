import Button from '../components/Button';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';

const Library = () => {
  return (
    <Layout>
      <PageTitle title='서재' />
      <Button color='pink' onClick={() => alert('hi')}>
        핑크
      </Button>
      <Button color='mint' onClick={() => alert('hi')} fullWidth={true}>
        민트
      </Button>
    </Layout>
  );
};

export default Library;
