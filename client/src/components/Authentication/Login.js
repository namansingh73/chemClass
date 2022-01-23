import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import authActions from '../../store/auth/auth-actions';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './LoginSignup.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authActions.resetAuth());
  }, [dispatch]);

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
          info: 'Welcome back Jonas!',
        })
      );

      navigate('/');
    } catch (err) {
      setLoading(false);

      dispatch(
        alertActions.alert({
          alertType: 'Error',
          info: 'Something went wrong!',
        })
      );
    }
  };

  return (
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

      <a
        href='https://youtu.be/dQw4w9WgXcQ'
        rel='noreferrer'
        target='_blank'
        className={styles.termsConditionsLink}
      >
        Forgot password?
      </a>

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
  );
};

export default Login;
