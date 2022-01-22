import React from 'react';
import Input from '../../utils/Input/Input';
import ProfilePhoto from './ProfilePhoto';
import styles from './ProfileContainer.module.css';
import profileIcon from './profile.png';
import Button from '../../utils/Button/Button';

const ProfileContainer = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.profileContainer}>
        <img src={profileIcon} className={styles.profileIcon} alt='Profile' />
        <form className={styles.accountForm}>
          <h1 className={styles.heading}>My Account</h1>
          <Input
            label='Name*'
            id='name'
            type='text'
            placeholder='Name*'
            defaultValue='Jonas'
            required
          />
          <Input
            label='Email*'
            id='email'
            type='email'
            placeholder='mail@website.com'
            defaultValue='jonas@gmail.com'
            required
          />
          <ProfilePhoto />

          <div className={styles.buttonContainer}>
            <Button className={styles.saveBtn} rounded>
              Save Changes
            </Button>
          </div>
        </form>

        <form className={styles.passwordForm}>
          <h2 className={styles.heading}>Change Password</h2>
          <Input
            label='Current Password*'
            id='currpassword'
            type='password'
            placeholder='Min 8 characters'
            minLength='8'
            required
          />
          <Input
            label='New Password*'
            id='newpassword'
            type='password'
            placeholder='Min 8 characters'
            minLength='8'
            required
          />
          <Input
            label='Confirm Password*'
            id='confirmpassword'
            type='password'
            placeholder='Min 8 characters'
            minLength='8'
            required
          />
          <div className={styles.buttonContainer}>
            <Button className={styles.saveBtn} rounded>
              Save Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileContainer;
