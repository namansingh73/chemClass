import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import clasroomActions from '../../store/classroom/classroom-actions';
import SubjectCard from './SubjectCard';
import Tooltip from '../../utils/Tooltip/Tooltip';
import PostAPost from '../PostAPost/PostAPost';
import Button from '../../utils/Button/Button';
import EditClassroom from '../EditClassroom/EditClassroom';
import styles from './LeftBlock.module.css';

const LeftBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subject = useSelector(({ subject }) => subject);
  const auth = useSelector(({ auth }) => auth);
  const [postType, setPostType] = useState('');
  const [copied, setCopied] = useState(false);
  const [displayEditClassroom, setDisplayEditClassroom] = useState(false);

  const isInstructor = auth.user._id === subject.instructor._id;

  let assignmentCount = 0;

  const archiveHandler = async () => {
    if (
      !window.confirm(`${subject.archived ? 'Unarchive' : 'Archive'} class`)
    ) {
      return;
    }

    try {
      await axios.patch(
        `/api/v1/classrooms/${subject._id}/${
          subject.archived ? 'unarchive' : 'archive'
        }`
      );

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: `Class ${
            !subject.archived ? 'unarchived' : 'archived'
          } successfully!`,
        })
      );
      dispatch(clasroomActions.loadClassrooms());
      navigate(`${!subject.archived ? '/classrooms/archived' : '/classrooms'}`);
    } catch (err) {
      if (err.response) {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: err.response.data.message,
          })
        );
      } else {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: 'Something went wrong!',
          })
        );
      }
    }
  };

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
          {displayEditClassroom && (
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
              hoverText={subject.archived ? 'Unarchive' : 'Archive'}
              DomElement='button'
              className={styles.classLinkCopyBtn}
              onClick={archiveHandler}
            >
              <i className='fas fa-archive'></i>
            </Tooltip>
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
