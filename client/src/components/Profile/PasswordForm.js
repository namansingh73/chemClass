import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './PasswordForm.module.css';

const PasswordForm = () => {
  const dispatch = useDispatch();

  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const data = { passwordCurrent, password, passwordConfirm };

      await axios.patch('/api/v1/users/updateMyPassword', data);

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Password updated successfully!',
        })
      );

      setPasswordCurrent('');
      setPassword('');
      setPasswordConfirm('');
    } catch (err) {
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

    setLoading(false);
  };
  return (
    <form className={styles.passwordForm} onSubmit={submitHandler}>
      <h2 className={styles.heading}>Change Password</h2>
      <Input
        label='Current Password*'
        id='currpassword'
        type='password'
        placeholder='Min 8 characters'
        minLength='8'
        required
        value={passwordCurrent}
        onChange={(e) => setPasswordCurrent(e.target.value)}
      />
      <Input
        label='New Password*'
        id='newpassword'
        type='password'
        placeholder='Min 8 characters'
        minLength='8'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label='Confirm Password*'
        id='confirmpassword'
        type='password'
        placeholder='Min 8 characters'
        minLength='8'
        required
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <div className={styles.buttonContainer}>
        <Button
          className={styles.saveBtn}
          rounded
          disabled={loading}
          loading={loading}
        >
          Save Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
