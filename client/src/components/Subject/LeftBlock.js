import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import SubjectCard from './SubjectCard';
import Tooltip from '../../utils/Tooltip/Tooltip';
import PostAPost from '../PostAPost/PostAPost';
import Button from '../../utils/Button/Button';
import EditClassroom from '../EditClassroom/EditClassroom';
import styles from './LeftBlock.module.css';

const LeftBlock = () => {
  const subject = useSelector(({ subject }) => subject);
  const auth = useSelector(({ auth }) => auth);
  const [postType, setPostType] = useState('');
  const [copied, setCopied] = useState(false);
  const [displayEditClasroom, setDisplayEditClassroom] = useState(false);

  const isInstructor = auth.user._id === subject.instructor._id;

  let assignmentCount = 0;

  subject.posts.forEach((post) => {
    if (post.postType === 'assignment' && !post.assignmentDetails.submission) {
      ++assignmentCount;
    }
  });

  return (
    <Fragment>
      <SubjectCard className={styles.classLink}>
        <div className={styles.classLinkTop}>
          <span className={styles.classLinkIcon}>
            <i className='fas fa-video'></i>
          </span>
          <span className={styles.classLinkText}>Meet</span>
          {isInstructor && (
            <button
              onClick={() => setDisplayEditClassroom(true)}
              className={styles.classLinkCopyBtn}
            >
              <i className='fas fa-pencil-alt'></i>
            </button>
          )}
          {displayEditClasroom && (
            <EditClassroom onClose={() => setDisplayEditClassroom(false)} />
          )}
          <Tooltip
            direction='top'
            hoverText={copied ? 'Copied!' : 'Copy Link'}
            DomElement='button'
            className={styles.classLinkCopyBtn}
            onClick={() => {
              if (!subject.meetLink) return;
              setCopied(true);
              navigator.clipboard.writeText(subject.meetLink);
              setTimeout(() => setCopied(false), 1000);
            }}
          >
            <i className='far fa-copy'></i>
          </Tooltip>
        </div>
        <div className={styles.classLinkBottom}>
          {subject.meetLink && (
            <Button
              className={styles.classLinkBtn}
              DomElement='a'
              href={subject.meetLink}
              target='_blank'
              fullWidth
            >
              Join Now
            </Button>
          )}
          {!subject.meetLink && (
            <Tooltip
              DomElement={Button}
              className={styles.classLinkBtn}
              fullWidth
              disabled
              hoverText='Meet link inactive'
            >
              Join Now
            </Tooltip>
          )}
        </div>
      </SubjectCard>

      {isInstructor && (
        <SubjectCard className={styles.assignmentInfo}>
          <div className={styles.classLinkTop}>
            <span className={styles.classLinkIcon}>
              <i className='fas fa-hashtag'></i>
            </span>
            <span className={styles.classLinkText}>{subject.classCode}</span>
            <Tooltip
              direction='top'
              hoverText={copied ? 'Copied!' : 'Copy Code'}
              DomElement='button'
              className={styles.classLinkCopyBtn}
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(subject.classCode);
                setTimeout(() => setCopied(false), 1000);
              }}
            >
              <i className='far fa-copy'></i>
            </Tooltip>
          </div>
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
        </SubjectCard>
      )}
    </Fragment>
  );
};

export default LeftBlock;
