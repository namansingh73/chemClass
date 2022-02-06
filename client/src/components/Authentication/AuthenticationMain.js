import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import styles from './AuthenticationMain.module.css';
import logo from './logo.png';
import googleLogo from './googleLogo.png';

const AuthenticationMain = (props) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFailure = () => {
    dispatch(
      alertActions.alert({
        alertType: 'Error',
        info: 'Something went wrong!',
      })
    );
  };

  const handleLoginSignup = async (googleData) => {
    try {
      setIsAuthenticating(true);

      await axios.post(
        `/api/v1/users/${
          props.type === 'Sign Up' ? 'googleSignup' : 'googleLogin'
        }`,
        {
          token: googleData.tokenId,
        }
      );

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info:
            props.type === 'Sign Up'
              ? 'Welcome to ChemClass!'
              : 'Welcome back!',
        })
      );

      navigate('/');
    } catch (err) {
      console.log(err);
      if (err.response) {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: err.response.data.message,
          })
        );
      } else {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: 'Something went wrong!',
          })
        );
      }
      setIsAuthenticating(false);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <img src={logo} alt='ChemClass' className={styles.logo} />
          <h1 className={styles.heading}>{props.type}</h1>
          <p className={styles.tagline}>Be the best you can be</p>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleLoginSignup}
            onFailure={handleFailure}
            cookiePolicy='single_host_origin'
            render={(forwardProps) => (
              <button {...forwardProps} className={styles.googleBtn}>
                <img
                  src={googleLogo}
                  className={styles.googleLogo}
                  alt='Google logo'
                />
                {isAuthenticating
                  ? 'Loading...'
                  : `Sign ${
                      props.type === 'Sign Up' ? 'up' : 'in'
                    } with Google`}
              </button>
            )}
          />

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
