import React from 'react';
import Authentication from '../../components/Authentication/Authentication';

const Login = () => {
  return <Authentication type='Login' redirectTo='/signup' />;
};

export default Login;
