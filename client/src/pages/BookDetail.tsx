import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';

const BookDetail = () => {
  const { id } = useParams();

  return (
    <Layout>
      <PageTitle title='책 상세 페이지' />
    </Layout>
  );
};

export default BookDetail;
