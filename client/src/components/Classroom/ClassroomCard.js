import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ClassroomCard.module.css';

const ClassroomCard = (props) => {
  return (
    <Link
      to={`/classrooms/${props.id}/${props.index}`}
      className={styles.classroomCard}
    >
      <div className={styles.imageContainer}>
        <img
          src={props.image}
          alt={props.subjectName}
          className={styles.image}
        />
        <div className={styles.studentsCount}>
          <i className={`fas fa-user-graduate ${styles.iconStudent}`}></i>{' '}
          {props.studentsCount}
        </div>
      </div>

      <div className={styles.main}>
        <h3 className={styles.subjectName}>{props.subjectName}</h3>
        <p className={styles.instructor}>
          <i className={`fas fa-user ${styles.instructorIcon}`}></i> &nbsp;
          {props.instructor}
        </p>
        {props.assignmentCount === null && (
          <p
            className={`${styles.assignment} ${styles.assignment__instructor}`}
          >
            <i className='fas fa-info-circle'></i> {props.studentsCount || 'No'}{' '}
            student
            {props.studentsCount > 1 ? 's' : ''} enrolled!
          </p>
        )}
        {props.assignmentCount !== null && props.assignmentCount !== 0 && (
          <p className={`${styles.assignment} ${styles.assignment__due}`}>
            <i className='fas fa-exclamation-circle'></i>{' '}
            {props.assignmentCount} assigments due
          </p>
        )}
        {props.assignmentCount === 0 && (
          <p className={`${styles.assignment} ${styles.assignment__noDue}`}>
            <i className='fas fa-check-circle'></i> No assigment due, Enjoy!
          </p>
        )}
      </div>
    </Link>
  );
};

export default ClassroomCard;
