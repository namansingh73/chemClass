import React from 'react';
import styles from './CircularProgessBar.module.scss';

const CircularProgressBar = ({ color, percentage, size }) => {
  percentage = Math.round(percentage);

  const customStyles = {};

  if (color) {
    customStyles['--current-color'] = `var(--color-${color})`;
  }

  if (size) {
    customStyles.fontSize = size;
  }

  return (
    <div
      style={customStyles}
      className={`${styles.setSize} ${styles.chartsContainer}`}
    >
      <div
        className={`${styles.pieWrapper} ${styles[`progress${percentage}`]}`}
      >
        <span className={styles.label}>
          {percentage}
          <span className={styles.smaller}>%</span>
        </span>
        <div className={styles.pie}>
          <div className={`${styles.leftSide} ${styles.halfCircle}`}></div>
          <div className={`${styles.rightSide} ${styles.halfCircle}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
