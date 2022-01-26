import React from 'react';
import loadingGif from './loadingSpinner.gif';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={loadingGif} alt='Loading...' className={styles.loadingGif} />
    </div>
  );
};

export default LoadingSpinner;
