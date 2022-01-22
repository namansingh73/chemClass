import React from 'react';
import Card from '../../layout/Card/Card';
import avatar from './avatar.png';
import styles from './SidebarProfile.module.css';
import { Link } from 'react-router-dom';

const SidebarProfile = () => {
  return (
    <Link to='/me' className={styles.textLink}>
      <Card className={styles.sidebarProfile}>
        <img src={avatar} alt='John Smith' className={styles.avatar} />
        <p className={styles.sidebarName}>
          John
          <br /> Smith
        </p>
      </Card>
    </Link>
  );
};

export default SidebarProfile;
