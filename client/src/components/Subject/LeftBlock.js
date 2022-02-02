import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SubjectCard from './SubjectCard';
import PostAPost from '../PostAPost/PostAPost';
import Button from '../../utils/Button/Button';
import styles from './LeftBlock.module.css';

const LeftBlock = () => {
  const subject = useSelector(({ subject }) => subject);
  const auth = useSelector(({ auth }) => auth);
  const [postType, setPostType] = useState('');
  const isInstructor = auth.user._id === subject.instructor._id;

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

      {isInstructor && (
        <SubjectCard className={styles.assignmentInfo}>
          <Button
            fullWidth
            color='red'
            className={styles.createBtn1}
            onClick={() => setPostType('announcement')}
          >
            <i className={`fas fa-bullhorn ${styles.createButtonIcon}`}></i>{' '}
            <span>Announcement</span>
          </Button>
          <Button
            fullWidth
            color='blue'
            onClick={() => setPostType('assignment')}
          >
            <i
              className={`far fa-calendar-plus ${styles.createButtonIcon}`}
            ></i>{' '}
            <span>Assignment</span>
          </Button>
        </SubjectCard>
      )}

      {postType && (
        <PostAPost onClose={() => setPostType('')} postType={postType} />
      )}

      {!isInstructor && (
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
      )}
    </Fragment>
  );
};

export default LeftBlock;
