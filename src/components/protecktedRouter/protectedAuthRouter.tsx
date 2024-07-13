import { FC } from 'react';
import { Navigate, Outlet, useOutlet } from 'react-router-dom';

interface ProtectedAuthRouteProps {
  isAuthenticated: boolean;
}

export const ProtectedAuthRoute: FC<ProtectedAuthRouteProps> = ({
  isAuthenticated
}) => {
  if (isAuthenticated) {
    return <Navigate to='/profile' replace />;
  }

  return <Outlet />;
};
