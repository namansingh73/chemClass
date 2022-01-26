import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import authActions from '../../store/auth/auth-actions';
import alertActions from '../../store/alert/alert-actions';
import Input from '../../utils/Input/Input';
import ProfilePhoto from './ProfilePhoto';
import Button from '../../utils/Button/Button';
import styles from './ProfileForm.module.css';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordForEmailUpdation, setPasswordForEmailUpdation] = useState('');
  const [loading, setLoading] = useState(false);

  const emailIsChanged = email !== user.email;

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = { name, email, passwordForEmailUpdation };

      const res = await axios.patch('/api/v1/users/updateMe', data);
      const user = res.data.data.user;

      setPasswordForEmailUpdation('');

      dispatch(authActions.loadedUser(user));
      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Profile updated successfully!',
        })
      );
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
    <form className={styles.accountForm} onSubmit={submitHandler}>
      <h1 className={styles.heading}>My Account</h1>

      <Input
        label='Name*'
        id='name'
        type='text'
        placeholder='Name*'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label='Email*'
        id='email'
        type='email'
        placeholder='mail@website.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {emailIsChanged && (
        <Input
          label='Current Password*'
          id='passwordForEmail'
          type='password'
          placeholder='Min 8 characters'
          minLength='8'
          value={passwordForEmailUpdation}
          name='passwordForEmailUpdation'
          onChange={(e) => setPasswordForEmailUpdation(e.target.value)}
          required
        />
      )}
      <ProfilePhoto />

      <div className={styles.buttonContainer}>
        <Button
          className={styles.saveBtn}
          rounded
          disabled={loading}
          loading={loading}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
