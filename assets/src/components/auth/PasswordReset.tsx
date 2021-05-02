import React from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
import {useAuth} from './AuthProvider';

const PasswordResetPage = (props: RouteComponentProps) => {
  const auth = useAuth();

  return <div>password reset TODO</div>;
};

export default PasswordResetPage;
