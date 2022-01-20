import React from 'react';
import Card from '../../layout/Card/Card';
import avatar from './avatar.png';
import styles from './SidebarProfile.module.css';

const SidebarProfile = () => {
  return (
    <Card className={styles.sidebarProfile}>
      <img src={avatar} alt='John Smith' className={styles.avatar} />
      <p className={styles.sidebarName}>
        John
        <br /> Smith
      </p>
    </Card>
  );
};

export default SidebarProfile;
