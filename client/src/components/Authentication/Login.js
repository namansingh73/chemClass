import React from 'react';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './LoginSignup.module.css';

const Signup = () => {
  return (
    <form>
      <Input
        label='Email*'
        id='email'
        type='email'
        placeholder='mail@website.com'
        required
      />
      <Input
        label='Password*'
        id='password'
        type='password'
        placeholder='Min 8 characters'
        minLength='8'
        required
      />

      <a
        href='https://youtu.be/dQw4w9WgXcQ'
        rel='noreferrer'
        target='_blank'
        className={styles.termsConditionsLink}
      >
        Forgot password?
      </a>

      <div className={styles.classLinkBottom}>
        <Button className={styles.classLinkBtn} rounded fullWidth>
          Login
        </Button>
      </div>
    </form>
  );
};

export default Signup;
