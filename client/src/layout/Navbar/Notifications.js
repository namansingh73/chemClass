import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import alertActions from '../../store/alert/alert-actions';
import Tooltip from '../../utils/Tooltip/Tooltip';
import CreateClassroom from '../../components/CreateClassroom/CreateClasroom';
import styles from './Notifications.module.css';

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [displayCreateClassPopup, setDisplayCreateClassPopup] = useState(false);

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
      {displayCreateClassPopup && (
        <CreateClassroom onClose={() => setDisplayCreateClassPopup()} />
      )}
      <Tooltip
        DomElement={'button'}
        hoverText={'Create Class'}
        className={styles.notificationBtn}
        direction={'left'}
        onClick={() => setDisplayCreateClassPopup(true)}
      >
        <i className='fas fa-plus'></i>
      </Tooltip>
      <button className={styles.notificationBtn} onClick={logoutHandler}>
        <i className='fas fa-sign-out-alt'></i>
      </button>
    </div>
  );
};

export default Notifications;
