import { FC, useLayoutEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '@slices';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuthenticated
}) => {
  const { isLoading } = useSelector((state) => state.userInfo);
  const dipatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dipatch(getUser()).then(() => {
      if (!isLoading && !isAuthenticated) {
        navigate('/login');
      }
    });
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <Outlet />;
};
