import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import authActions from '../../store/auth/auth-actions';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import styles from './LoginSignup.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayForgotPassword, setDisplayForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authActions.resetAuth());
  }, [dispatch]);

  const forgotPasswordClickHandler = () => {
    setDisplayForgotPassword(true);
  };

  const forgotPasswordCloseHandler = () => {
    setDisplayForgotPassword(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = { email, password };
      const user = await axios.post('/api/v1/users/login', data);
      console.log(user);

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Welcome back!',
        })
      );

      navigate('/');
    } catch (err) {
      setLoading(false);

      if (err.response) {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: err.response.data.message,
          })
        );
      } else {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: 'Something went wrong!',
          })
        );
      }
    }
  };

  return (
    <Fragment>
      {displayForgotPassword && (
        <ForgotPassword onClose={forgotPasswordCloseHandler} />
      )}

      <form onSubmit={submitHandler}>
        <Input
          label='Email*'
          id='email'
          type='email'
          placeholder='mail@website.com'
          required
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Input
          label='Password*'
          id='password'
          type='password'
          placeholder='Min 8 characters'
          minLength='8'
          required
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <button
          type='button'
          className={styles.forgotPassword}
          onClick={forgotPasswordClickHandler}
        >
          Forgot password?
        </button>

        <div className={styles.classLinkBottom}>
          <Button
            className={styles.classLinkBtn}
            rounded
            fullWidth
            disabled={loading}
            loading={loading}
          >
            Login
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
