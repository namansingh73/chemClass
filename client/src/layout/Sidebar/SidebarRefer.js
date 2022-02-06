import React from 'react';
import styles from './SidebarRefer.module.css';
import teacherIcon from './teacher_students.png';

const SidebarRefer = () => {
  return (
    <div className={styles.sidebarRefer}>
      <img
        src={teacherIcon}
        className={styles.teacherImg}
        alt='Teaching icon'
      />
    </div>
  );
};

export default SidebarRefer;
