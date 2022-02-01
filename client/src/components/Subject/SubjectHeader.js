import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SubjectHeader.module.css';

const SubjectHeader = (props) => {
  const subject = useSelector(({ subject }) => subject);

  return (
    <header className={styles.subjectHeader}>
      <img
        src={props.image}
        alt={subject.name}
        className={styles.headerImage}
      />
      <div className={styles.subjectInfo}>
        <div className={styles.subjectIcon}>
          <i className='fas fa-pencil-alt'></i>
        </div>
        <div className={styles.subjectInfoMain}>
          <h1 className={styles.subjectName}>{subject.name}</h1>
          <p className={styles.instructor}>{subject.instructor.name}</p>
        </div>
      </div>
    </header>
  );
};

export default SubjectHeader;
