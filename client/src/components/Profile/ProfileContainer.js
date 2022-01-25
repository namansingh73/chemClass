import React from 'react';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import profileIcon from './profile.png';
import styles from './ProfileContainer.module.css';

const ProfileContainer = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.profileContainer}>
        <img src={profileIcon} className={styles.profileIcon} alt='Profile' />
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
};

export default ProfileContainer;
