import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './ResetPassword.module.css';
import logo from './logo.png';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = { password, passwordConfirm };
      await axios.patch(`/api/v1/users/resetPassword/${params.token}`, data);

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Password reset successful!',
        })
      );

      navigate('/login');
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
    <div className={styles.outerContainer}>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.header}>
          <img src={logo} alt='ChemClass' className={styles.logo} />
          <h1 className={styles.heading}>Reset Passsword</h1>
          <p className={styles.tagline}>Be the best you can be</p>
        </div>

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

        <div className={styles.classLinkBottom}>
          <Button
            className={styles.classLinkBtn}
            rounded
            fullWidth
            disabled={loading}
            loading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
