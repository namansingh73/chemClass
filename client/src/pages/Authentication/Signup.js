import React from 'react';
import AuthenticationMain from '../../components/Authentication/AuthenticationMain';
import SignupBody from '../../components/Authentication/Signup';

const Signup = () => {
  return (
    <AuthenticationMain type='Sign Up'>
      <SignupBody />
    </AuthenticationMain>
  );
};

export default Signup;
