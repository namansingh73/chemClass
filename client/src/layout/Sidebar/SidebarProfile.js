import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../layout/Card/Card';
import avatar from './avatar.png';
import styles from './SidebarProfile.module.css';
import { Link } from 'react-router-dom';

const SidebarProfile = () => {
  const { user } = useSelector(({ auth }) => auth);

  const [firstName, lastName] = user.name.split(' ');

  return (
    <Link to='/me' className={styles.textLink}>
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
    </Link>
  );
};

export default SidebarProfile;
