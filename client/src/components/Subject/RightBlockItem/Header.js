import React from 'react';
import userImage from './user.png';
import prettyDate from '../../../utils/HelperFunctions/prettyDate';
import styles from './Header.module.css';

const Header = (props) => {
  return (
    <div className={styles.header}>
      <img
        src={props.instructor.photo?.url || userImage}
        alt={props.instructor.name}
        className={styles.instructorIcon}
      />
      <div className={styles.instructorTime}>
        <p className={styles.instructor}>{props.instructor.name}</p>
        <p className={styles.time}>{prettyDate(props.post.createdAt)}</p>
      </div>
    </div>
  );
};

export default Header;
