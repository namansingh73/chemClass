import React from 'react';
import MiscSidebarClass from './MiscSidebarClass';
import styles from './MiscSidebarClassesEvents.module.css';

const MiscSidebarClassesEvents = () => {
  return (
    <div className={styles.classesEvents}>
      <h2 className={styles.heading}>Classes & Events</h2>
      <div>
        <MiscSidebarClass />
      </div>
    </div>
  );
};

export default MiscSidebarClassesEvents;
