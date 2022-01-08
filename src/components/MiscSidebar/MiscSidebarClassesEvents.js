import React from 'react';
import MiscSidebarClassEventItem from './MiscSidebarClassEventItem';
import styles from './MiscSidebarClassesEvents.module.css';

const MiscSidebarClassesEvents = () => {
  return (
    <div className={styles.classesEvents}>
      <h2 className={styles.heading}>Classes & Events</h2>
      <div>
        <MiscSidebarClassEventItem
          type='class'
          percentage={70}
          title='Mathematics'
          color='yellow'
          date='15th Janurary, 2022'
        />

        <MiscSidebarClassEventItem
          type='event'
          title='Sports Meet'
          date='16th Janurary, 2022'
        />
      </div>
    </div>
  );
};

export default MiscSidebarClassesEvents;
