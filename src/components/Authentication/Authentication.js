import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import Button from '../../utils/Button/Button';
import styles from './Authentication.module.css';
import logo from './logo.png';
import googleLogo from './googleLogo.png';

const Authentication = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <img src={logo} alt='ChemClass' className={styles.logo} />
          <h1 className={styles.heading}>Signup</h1>
          <p className={styles.tagline}>Be the best you can be</p>

          <button className={styles.googleBtn}>
            <img
              src={googleLogo}
              className={styles.googleLogo}
              alt='Google logo'
            />
            Sign up with Google
          </button>

          <div className={styles.signupSecondary}>
            <span className={styles.signupSecondaryText}>
              or Sign up with Email
            </span>
          </div>
          <form className={styles.inputs}>
            <Input
              label='Name*'
              id='name'
              type='text'
              placeholder='Name'
              required
            />
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

            <label htmlFor='tnc' className={styles.checkboxLabel}>
              <input
                type='checkbox'
                id='tnc'
                required
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxActual}>&#10003;</span>I agree to
              the&nbsp;
              <a
                href='https://youtu.be/dQw4w9WgXcQ'
                rel='noreferrer'
                target='_blank'
                className={styles.termsConditionsLink}
              >
                Terms & Conditions
              </a>
            </label>
            <div className={styles.classLinkBottom}>
              <Button className={styles.classLinkBtn} rounded fullWidth>
                Sign Up
              </Button>
            </div>
          </form>
          <span className={styles.alternateOption}>
            Already have an account?{' '}
            <Link to='/login' className={styles.signIn}>
              Sign In
            </Link>
          </span>
        </div>
        <div className={styles.rightContainer}></div>
      </div>
    </div>
  );
};

export default Authentication;
