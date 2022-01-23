import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authActions from '../../store/auth/auth-actions';

const RequireAuth = ({ children, redirectTo = 'login' }) => {
  const { user, loadingUser, cannotLoad } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  if (cannotLoad) {
    return <Navigate to='/login' />;
  }

  if (!user && !loadingUser) {
    dispatch(authActions.loadUser());
  }

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  return children;
};

export default RequireAuth;
