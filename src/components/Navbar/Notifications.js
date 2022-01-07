import React from 'react';
import styles from './Notifications.module.css';

const Notifications = () => {
  return (
    <div>
      <button className={styles.notificationBtn}>
        <i className='fas fa-wrench'></i>
      </button>
      <button className={styles.notificationBtn}>
        <i className='far fa-bell'></i>
      </button>
    </div>
  );
};

export default Notifications;
