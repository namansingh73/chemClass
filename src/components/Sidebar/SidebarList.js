import React from 'react';
import styles from './SidebarList.module.css';

function SidebarList() {
  return (
    <ul className={styles.sidebarList}>
      <li
        className={`${styles.sidebarListItem} ${styles.sidebarListItem__active}`}
      >
        <a href='#!' className={styles.sidebarListLink}>
          <span className={styles.sidebarListIcon}>
            <i className='fas fa-store-alt' />
          </span>
          Home
        </a>
      </li>
      <li className={styles.sidebarListItem}>
        <a href='#!' className={styles.sidebarListLink}>
          <span className={styles.sidebarListIcon}>
            <i class='fas fa-chalkboard' />
          </span>
          Classrooms
        </a>
      </li>
      <li className={styles.sidebarListItem}>
        <a href='#!' className={styles.sidebarListLink}>
          <span className={styles.sidebarListIcon}>
            <i class='far fa-calendar-alt' />
          </span>
          Tasks
        </a>
      </li>
      <li className={styles.sidebarListItem}>
        <a href='#!' className={styles.sidebarListLink}>
          <span className={styles.sidebarListIcon}>
            <i class='far fa-clipboard' />
          </span>
          Notices
        </a>
      </li>
    </ul>
  );
}

export default SidebarList;
