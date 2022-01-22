import React from 'react';
import AuthenticationMain from '../../components/Authentication/AuthenticationMain';
import LoginBody from '../../components/Authentication/Login';

const Login = () => {
  return (
    <AuthenticationMain type='Login'>
      <LoginBody />
    </AuthenticationMain>
  );
};

export default Login;
