import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './ForgotPassword.module.css';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = { email };
      await axios.post('/api/v1/users/forgotPassword', data);
      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Password reset mail sent successfully!',
        })
      );
      props.onClose();
    } catch {
      dispatch(
        alertActions.alert({
          alertType: 'Error',
          info: 'Something went wrong!',
        })
      );
    }

    setLoading(false);
  };

  return (
    <PopupCard onClose={props.onClose}>
      <form className={styles.emailForm} onSubmit={submitHandler}>
        <h2 className={styles.heading}>Forgot Password?</h2>
        <p>
          No worries, just enter your registered email to get the reset password
          link!
        </p>
        <Input
          id='email'
          type='email'
          placeholder='mail@website.com'
          required
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Button color='blue' rounded disabled={loading} loading={loading}>
          <i className='fab fa-telegram-plane'></i> Send
        </Button>
      </form>
    </PopupCard>
  );
};

export default ForgotPassword;
