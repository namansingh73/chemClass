import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../layout/Card/Card';
import CircularProgressBar from '../../utils/CircularProgessBar/CircularProgressBar';
import styles from './MiscSidebarClassEventItem.module.css';
import calendarImg from './calendar.png';

// type -> 'progress' or 'assignment'
// title is must
// dateTime is must
// color and percentage required for type = 'progress'
const MiscSidebarClassEventItem = ({
  type,
  title,
  dateTime,
  color,
  percentage,
  redirectTo,
}) => {
  const OuterDomElement = type === 'assignment' ? Link : 'div';

  return (
    <OuterDomElement className={styles.outerContainer} to={redirectTo}>
      <Card className={styles.miscSidebarClassEventItem}>
        <div className={styles.logoBox}>
          {type === 'progress' ? (
            <CircularProgressBar
              percentage={percentage}
              color={color}
              size='7rem'
            />
          ) : (
            <img
              className={styles.logo}
              src={calendarImg}
              alt='Calendar Icon'
            />
          )}
        </div>
        <div className={styles.mainContent}>
          <p className={styles.title}>{title}</p>
          <p className={styles.date}>Due: {dateTime} </p>
        </div>
        {type !== 'progress' && <span className={styles.arrow}>&gt;</span>}
      </Card>
    </OuterDomElement>
  );
};

export default MiscSidebarClassEventItem;
