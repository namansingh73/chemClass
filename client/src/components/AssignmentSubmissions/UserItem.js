import React from 'react';
import Tooltip from '../../utils/Tooltip/Tooltip';
import avatarStudent from './avatarStudent.png';
import avatarInstructor from './avatarInstructor.png';
import styles from './UserItem.module.css';

const UserItem = (props) => {
  let status = 'Missing';
  let color = 'red';

  if (props.submission) {
    if (
      new Date(props.submission.submittedAt) >
      new Date(props.post.assignmentDetails.due)
    ) {
      status = 'Submitted late';
      color = 'yellowOrange';
    } else {
      status = 'Submitted';
      color = 'green';
    }
  }

  return (
    <div className={styles.outerContainer}>
      <img
        src={
          props.user.photo?.url ||
          (props.type === 'instructor' ? avatarInstructor : avatarStudent)
        }
        alt={props.user.name}
        className={styles.avatarIcon}
      />
      <div
        className={`${styles.name} ${
          props.isDisabled && styles.name__disabled
        }`}
      >
        {props.user.name}{' '}
        <span
          style={{
            color: `var(--color-${color})`,
            fontSize: '1.4rem',
            fontWeight: '600',
          }}
        >
          {`(${status})`}
        </span>
      </div>

      {props.submission && (
        <Tooltip
          direction='left'
          hoverText='View Submission'
          DomElement='a'
          className={`${styles.button} ${
            status === 'Submitted late' && styles.button_late
          }`}
          href={props.submission.attachment.url}
          target='_blank'
          rel='noreferrer'
        >
          <i className='fab fa-telegram-plane'></i>
        </Tooltip>
      )}
    </div>
  );
};

export default UserItem;
