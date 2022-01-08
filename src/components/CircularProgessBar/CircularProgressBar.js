import React from 'react';
import styles from './CircularProgessBar.module.css';

const CircularProgressBar = ({ color, percentage, size }) => {
  return (
    // Pie Wrapper
    <div
      style={{
        '--current-color': color && `var(--color-${color})`,
        '--size': size,
        '--percentage': percentage,
      }}
      className={styles.pieWrapper}
    >
      {/* Label */}
      <span className={styles.label}>
        {percentage}
        <span className={styles.label__smaller}>%</span>
      </span>

      {/* Pie */}
      <div
        className={`${styles.pie} ${
          percentage > 50 && styles.pie__greaterThan50
        }`}
      >
        {/* Half Circle - Left Side */}
        <div
          className={`${styles.halfCircle__leftSide} ${styles.halfCircle}`}
        />

        {/* Half Circle - Right Side */}
        <div
          className={`${styles.halfCircle__rightSide} ${styles.halfCircle}`}
        />
      </div>
    </div>
  );
};

export default CircularProgressBar;
