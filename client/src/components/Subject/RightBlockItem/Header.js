import React from 'react';
import { useSelector } from 'react-redux';
import userImage from './user.png';
import prettyDate from '../../../utils/HelperFunctions/prettyDate';
import styles from './Header.module.css';

const Header = (props) => {
  const subject = useSelector(({ subject }) => subject);

  return (
    <div className={styles.header}>
      <img
        src={subject.instructor.photo?.url || userImage}
        alt={subject.instructor.name}
        className={styles.instructorIcon}
      />
      <div className={styles.instructorTime}>
        <p className={styles.instructor}>{subject.instructor.name}</p>
        <p className={styles.time}>{prettyDate(props.post.createdAt)}</p>
      </div>
    </div>
  );
};

export default Header;
