import React, { Fragment } from 'react';
import SubjectCard from './SubjectCard';
import Button from '../../utils/Button/Button';
import styles from './LeftBlock.module.css';
// import videoIcon from './videoCamera.png';

const LeftBlock = () => {
  return (
    <Fragment>
      <SubjectCard className={styles.classLink}>
        <div className={styles.classLinkTop}>
          <span className={styles.classLinkIcon}>
            <i className='fas fa-video'></i>
          </span>
          {/* <img
            src={videoIcon}
            alt='Class Link'
            className={styles.classLinkIcon}
          /> */}
          <span className={styles.classLinkText}>Meet</span>
          <button className={styles.classLinkCopyBtn}>
            <i class='far fa-copy'></i>
          </button>
        </div>
        <div className={styles.classLinkBottom}>
          <Button className={styles.classLinkBtn} fullWidth>
            Join Now
          </Button>
        </div>
      </SubjectCard>

      <SubjectCard className={styles.assignmentInfo}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
        necessitatibus ullam illum.
      </SubjectCard>
    </Fragment>
  );
};

export default LeftBlock;
