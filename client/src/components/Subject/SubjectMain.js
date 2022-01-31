import React from 'react';
import LeftBlock from './LeftBlock';
import RightBlock from './RightBlock';
import styles from './SubjectMain.module.css';

const SubjectMain = (props) => {
  return (
    <div className={styles.subjectMain}>
      <div className={styles.left}>
        <LeftBlock subject={props.subject} />
      </div>
      <div className={styles.right}>
        <RightBlock subject={props.subject} />
      </div>
    </div>
  );
};

export default SubjectMain;
