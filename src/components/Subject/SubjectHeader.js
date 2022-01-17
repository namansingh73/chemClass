import React from 'react';
import styles from './SubjectHeader.module.css';

const SubjectHeader = (props) => {
  return (
    <header className={styles.subjectHeader}>
      <img
        src={props.image}
        alt={props.subjectName}
        className={styles.headerImage}
      />
      <div className={styles.subjectInfo}>
        <div className={styles.subjectIcon}>
          <i className='fas fa-pencil-alt'></i>
        </div>
        <div className={styles.subjectInfoMain}>
          <h1 className={styles.subjectName}>{props.subjectName}</h1>
          <p className={styles.instructor}>{props.instructor}</p>
        </div>
      </div>
    </header>
  );
};

export default SubjectHeader;
