import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StudentsList from '../StudentsList/StudentsList';
import styles from './SubjectHeader.module.css';

const SubjectHeader = (props) => {
  const subject = useSelector(({ subject }) => subject);
  const [displayStudentList, setDisplayStudentList] = useState(false);

  return (
    <header className={styles.subjectHeader}>
      {displayStudentList && (
        <StudentsList onClose={() => setDisplayStudentList(false)} />
      )}

      <div
        className={styles.studentsCount}
        onClick={() => setDisplayStudentList(true)}
      >
        <i className={`fas fa-user-graduate ${styles.iconStudent}`}></i>{' '}
        {subject.students.length}
      </div>

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
