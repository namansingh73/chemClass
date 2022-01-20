import React from 'react';
import DayPicker from 'react-day-picker';
import MiscSidebarClassesEvents from './MiscSidebarClassesEvents';
import styles from './MiscSidebar.module.css';

const MiscSidebar = () => {
  return (
    <div className={styles.miscSidebar}>
      <DayPicker />
      <MiscSidebarClassesEvents />
    </div>
  );
};

export default MiscSidebar;
