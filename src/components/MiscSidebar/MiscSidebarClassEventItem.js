import React from 'react';
import Card from '../../layout/Card/Card';
import CircularProgressBar from '../CircularProgessBar/CircularProgressBar';
import styles from './MiscSidebarClassEventItem.module.css';
import calendarImg from './calendar.png';

// type -> 'class' or 'event'
// title is must
// date is must
// color and percentage required for type = 'class'
const MiscSidebarClassEventItem = ({
  type,
  title,
  date,
  color,
  percentage,
}) => {
  return (
    <Card className={styles.miscSidebarClassEventItem}>
      <div className={styles.logoBox}>
        {type === 'class' ? (
          <CircularProgressBar
            percentage={percentage}
            color={color}
            size='7rem'
          />
        ) : (
          <img className={styles.logo} src={calendarImg} alt='Calendar Icon' />
        )}
      </div>
      <div className={styles.mainContent}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date}</p>
      </div>
      <span className={styles.arrow}>&gt;</span>
    </Card>
  );
};

export default MiscSidebarClassEventItem;
