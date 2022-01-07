import React from 'react';
import avatar from './avatar.png';
import styles from './SidebarProfile.module.css';

const SidebarProfile = () => {
  return (
    <div className={styles.sidebarProfile}>
      <img src={avatar} alt='John Smith' className={styles.avatar} />
      <p className={styles.sidebarName}>
        John
        <br /> Smith
      </p>
    </div>
  );
};

export default SidebarProfile;
