import React from 'react';
import loadingGif from './errorGif.gif';
import Button from '../../utils/Button/Button';
import styles from './Error.module.css';

const Error = (props) => {
  return (
    <div
      className={`${styles.error} ${props.fullWidth && styles.error_fullWidth}`}
    >
      <h1 className={styles.heading}>
        {props.heading || 'Something went wrong!'}
      </h1>
      <img src={loadingGif} alt='Loading...' className={styles.errorGif} />
      <p className={styles.text}>
        {props.text || 'Time to wake up your developers!'}
      </p>
      {props.onReload && (
        <Button color='blue' onClick={props.onReload}>
          Retry <i className={`fas fa-redo ${styles.btnIcon}`}></i>
        </Button>
      )}
      {props.text && <p className={styles.text}></p>}
    </div>
  );
};

export default Error;
