import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthenticationMain.module.css';
import logo from './logo.png';
import googleLogo from './googleLogo.png';

const AuthenticationMain = (props) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <img src={logo} alt='ChemClass' className={styles.logo} />
          <h1 className={styles.heading}>{props.type}</h1>
          <p className={styles.tagline}>Be the best you can be</p>

          <button className={styles.googleBtn}>
            <img
              src={googleLogo}
              className={styles.googleLogo}
              alt='Google logo'
            />
            Sign {props.type === 'Sign Up' ? 'up' : 'in'} with Google
          </button>

          <div className={styles.signupSecondary}>
            <span className={styles.signupSecondaryText}>
              or {props.type === 'Sign Up' ? 'Sign up' : 'Sign in'} with Email
            </span>
          </div>

          <div className={styles.inputs}>{props.children}</div>
          <span className={styles.alternateOption}>
            {props.type === 'Sign Up'
              ? 'Already have an account?'
              : 'Not registered yet?'}{' '}
            <Link
              to={props.type === 'Sign Up' ? '/login' : '/signup'}
              className={styles.signIn}
            >
              {props.type === 'Sign Up' ? 'Sign In' : 'Create an Account'}
            </Link>
          </span>
        </div>
        <div className={styles.rightContainer}></div>
      </div>
    </div>
  );
};

export default AuthenticationMain;
