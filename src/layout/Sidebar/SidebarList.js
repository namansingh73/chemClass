import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SidebarList.module.css';

function SidebarList() {
  return (
    <ul className={styles.sidebarList}>
      <li className={styles.sidebarListItem}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.sidebarListLink} ${
              isActive ? styles.sidebarListLink__active : ''
            }`
          }
        >
          <span className={styles.sidebarListIcon}>
            <i className='fas fa-store-alt' />
          </span>
          Home
        </NavLink>
      </li>
      <li className={styles.sidebarListItem}>
        <NavLink
          to='/classrooms'
          className={({ isActive }) =>
            `${styles.sidebarListLink} ${
              isActive ? styles.sidebarListLink__active : ''
            }`
          }
        >
          <span className={styles.sidebarListIcon}>
            <i className='fas fa-chalkboard' />
          </span>
          Classrooms
        </NavLink>
      </li>
      <li className={styles.sidebarListItem}>
        <NavLink
          to='/tasks'
          className={({ isActive }) =>
            `${styles.sidebarListLink} ${
              isActive ? styles.sidebarListLink__active : ''
            }`
          }
        >
          <span className={styles.sidebarListIcon}>
            <i className='far fa-calendar-alt' />
          </span>
          Tasks
        </NavLink>
      </li>
      <li className={styles.sidebarListItem}>
        <NavLink
          to='/notices'
          className={({ isActive }) =>
            `${styles.sidebarListLink} ${
              isActive ? styles.sidebarListLink__active : ''
            }`
          }
        >
          <span className={styles.sidebarListIcon}>
            <i className='far fa-clipboard' />
          </span>
          Notices
        </NavLink>
      </li>
    </ul>
  );
}

export default SidebarList;
