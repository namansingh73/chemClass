import React from 'react';
import userImage from './user.png';
import styles from './Header.module.css';

const Header = (props) => {
  return (
    <div className={styles.header}>
      <img
        src={userImage}
        alt={props.instructor}
        className={styles.instructorIcon}
      />
      <div className={styles.instructorTime}>
        <p className={styles.instructor}>{props.instructor}</p>
        <p className={styles.time}>11:51 PM</p>
      </div>
    </div>
  );
};

export default Header;
