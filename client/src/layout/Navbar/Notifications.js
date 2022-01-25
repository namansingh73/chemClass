import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import alertActions from '../../store/alert/alert-actions';
import styles from './Notifications.module.css';

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    if (!window.confirm('Are you sure you want to logout?')) {
      return;
    }

    try {
      await axios.get('/api/v1/users/logout');

      navigate('/login');
    } catch (err) {
      dispatch(
        alertActions.alert({
          alertType: 'Error',
          info: 'Something went wrong!',
        })
      );
    }
  };

  return (
    <div>
      <button className={styles.notificationBtn}>
        <i className='far fa-bell'></i>
      </button>
      <button className={styles.notificationBtn} onClick={logoutHandler}>
        <i className='fas fa-sign-out-alt'></i>
      </button>
    </div>
  );
};

export default Notifications;
