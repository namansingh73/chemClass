import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SubjectCard from './SubjectCard';
import Button from '../../utils/Button/Button';
import styles from './LeftBlock.module.css';

const LeftBlock = () => {
  const assignmentCount = 0;

  return (
    <Fragment>
      <SubjectCard className={styles.classLink}>
        <div className={styles.classLinkTop}>
          <span className={styles.classLinkIcon}>
            <i className='fas fa-video'></i>
          </span>
          <span className={styles.classLinkText}>Meet</span>
          <button className={styles.classLinkCopyBtn}>
            <i className='far fa-copy'></i>
          </button>
        </div>
        <div className={styles.classLinkBottom}>
          <Button className={styles.classLinkBtn} fullWidth>
            Join Now
          </Button>
        </div>
      </SubjectCard>

      <SubjectCard className={styles.assignmentInfo}>
        <h3 className={styles.assignmentInfoHeading}>
          <i className={`fas fa-bullhorn ${styles.assignmentInfoIcon}`}></i>{' '}
          Upcoming
        </h3>
        {assignmentCount !== 0 && (
          <p
            className={`${styles.assignmentInfoStatus} ${styles.assignmentInfoStatus__due}`}
          >
            <i className='fas fa-exclamation-circle'></i> {assignmentCount}{' '}
            assigments due
          </p>
        )}
        {assignmentCount === 0 && (
          <p
            className={`${styles.assignmentInfoStatus} ${styles.assignmentInfoStatus__noDue}`}
          >
            <i className='fas fa-check-circle'></i> No assigment due, Enjoy!
          </p>
        )}
        <div className={styles.assignmentInfoView}>
          <Link to='#!' className={styles.assignmentInfoViewLink}>
            View All
          </Link>
        </div>
      </SubjectCard>
    </Fragment>
  );
};

export default LeftBlock;
