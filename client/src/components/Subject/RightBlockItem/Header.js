import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import SubmitAssignment from '../../SubmitAssignment/SubmitAssignment';
import Button from '../../../utils/Button/Button';
import userImage from './user.png';
import prettyDate from '../../../utils/HelperFunctions/prettyDate';
import styles from './Header.module.css';

const Header = (props) => {
  const subject = useSelector(({ subject }) => subject);
  const auth = useSelector(({ auth }) => auth);
  const [displaySubmitAssignmentPopup, setDisplaySubmitAssignmentPopup] =
    useState(false);

  const isInstructor = auth.user._id === subject.instructor._id;

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
        {props.post.postType === 'assignment' && (
          <div className={styles.dueDate}>
            Due: March 12th 2022
            {!isInstructor && (
              <Fragment>
                {' - '}
                <span className={styles.submissionStatus}>Assigned</span>
              </Fragment>
            )}
          </div>
        )}
      </div>
      <div className={styles.submission}>
        <div>
          {props.post.postType === 'assignment' && (
            <Button
              onClick={() => setDisplaySubmitAssignmentPopup(true)}
              rounded
              color={isInstructor ? 'red' : 'blue'}
            >
              {isInstructor ? 'Submissions' : 'Submit'}
            </Button>
          )}
          {displaySubmitAssignmentPopup && (
            <SubmitAssignment
              onClose={() => setDisplaySubmitAssignmentPopup(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
