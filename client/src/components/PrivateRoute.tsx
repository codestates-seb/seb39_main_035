import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../stores/store';

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return isLoggedIn ? <Outlet /> : <Navigate to='/members/sign-in' />;
};

export default PrivateRoute;
