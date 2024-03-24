import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, ...rest }): ReactElement => {
  const isLoggedIn = localStorage.getItem('tokenCustomer');

  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/choose-logins" replace />;
};

export default ProtectedRoute;