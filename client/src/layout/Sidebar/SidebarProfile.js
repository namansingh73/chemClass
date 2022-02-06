import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../layout/Card/Card';
import avatar from './avatar.png';
import styles from './SidebarProfile.module.css';

const SidebarProfile = () => {
  const { user } = useSelector(({ auth }) => auth);

  const [firstName, lastName] = user.name.split(' ');

  return (
    <div className={styles.textLink}>
      <Card className={styles.sidebarProfile}>
        <img
          src={user?.photo?.url || avatar}
          alt={user.name}
          className={styles.avatar}
        />
        <p className={styles.sidebarName}>
          {firstName}
          <br /> {lastName}
        </p>
      </Card>
    </div>
  );
};

export default SidebarProfile;
