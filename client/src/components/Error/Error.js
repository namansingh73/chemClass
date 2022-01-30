import React from 'react';
import loadingGif from './errorGif.gif';
import Button from '../../utils/Button/Button';
import styles from './Error.module.css';

const Error = (props) => {
  return (
    <div className={styles.error}>
      <h1 className={styles.heading}>Something went wrong!</h1>
      <img src={loadingGif} alt='Loading...' className={styles.errorGif} />
      <p className={styles.text}>Time to wake up your developers!</p>
      <Button color='blue' onClick={props.onReload}>
        Retry <i className={`fas fa-redo ${styles.btnIcon}`}></i>
      </Button>
    </div>
  );
};

export default Error;
