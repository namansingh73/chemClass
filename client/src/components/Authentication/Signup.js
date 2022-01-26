import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import authActions from '../../store/auth/auth-actions';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './LoginSignup.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [tncAccepted, setTncAccepted] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authActions.resetAuth());
  }, [dispatch]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      dispatch(
        alertActions.alert({
          alertType: 'Error',
          info: "Passwords doesn't match!",
        })
      );
      return;
    }

    if (!tncAccepted) {
      dispatch(
        alertActions.alert({
          alertType: 'Error',
          info: 'Please accept Terms & Conditions',
        })
      );
      return;
    }

    setLoading(true);

    try {
      const data = { name, email, password, passwordConfirm };
      const user = await axios.post('/api/v1/users/signup', data);
      console.log(user);

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Welcome to ChemClass!',
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
    <form onSubmit={submitHandler}>
      <Input
        label='Name*'
        id='name'
        type='text'
        placeholder='Name'
        name='Name'
        required
        onChange={(event) => setName(event.target.value)}
        value={name}
      />

      <Input
        label='Email*'
        id='email'
        type='email'
        placeholder='mail@website.com'
        name='email'
        required
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <Input
        label='Password*'
        id='password'
        type='password'
        placeholder='Min 8 characters'
        name='password'
        minLength='8'
        required
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <Input
        label='Password Confirm*'
        id='passwordConfirm'
        type='password'
        placeholder='Min 8 characters'
        name='passwordConfirm'
        minLength='8'
        required
        onChange={(event) => setPasswordConfirm(event.target.value)}
        value={passwordConfirm}
      />

      <label htmlFor='tnc' className={styles.checkboxLabel}>
        <input
          type='checkbox'
          id='tnc'
          name='tnc'
          className={styles.checkboxInput}
          checked={tncAccepted}
          onChange={(e) => setTncAccepted(e.target.checked)}
          onClick={(e) => setTncAccepted(e.target.checked)}
        />
        <span className={styles.checkboxActual}>&#10003;</span>I agree to
        the&nbsp;
        <a
          href='https://youtu.be/dQw4w9WgXcQ'
          rel='noreferrer'
          target='_blank'
          className={styles.termsConditionsLink}
        >
          Terms & Conditions
        </a>
      </label>

      <div className={styles.classLinkBottom}>
        <Button
          className={styles.classLinkBtn}
          rounded
          fullWidth
          disabled={loading}
          loading={loading}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default Signup;
