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

  let status = 'Assigned';
  let color = 'blue';

  if (!isInstructor && props.post?.assignmentDetails) {
    if (props.post?.assignmentDetails.submission) {
      if (
        new Date(props.post.assignmentDetails.submission.submittedAt) >
        new Date(props.post.assignmentDetails.due)
      ) {
        status = 'Submitted late';
        color = 'yellowOrange';
      } else {
        status = 'Submitted';
        color = 'green';
      }
    } else if (new Date(props.post.assignmentDetails.due) < Date.now()) {
      status = 'Missing';
      color = 'red';
    }
  }

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
            Due:{' '}
            {(() => {
              const d = new Date(props.post.assignmentDetails.due);
              const dStr =
                prettyDate(d, false) +
                ' - ' +
                d.toLocaleTimeString().substr(0, 5) +
                ' ' +
                d.toLocaleTimeString().substr(9, 2);
              return dStr;
            })()}
            {!isInstructor && (
              <Fragment>
                {' - '}
                <span
                  style={{
                    color: `var(--color-${color})`,
                  }}
                  className={styles.submissionStatus}
                >
                  {status}
                </span>
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
              post={props.post}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
