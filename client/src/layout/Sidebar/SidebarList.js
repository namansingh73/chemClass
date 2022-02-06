import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SidebarList.module.css';

function SidebarList() {
  return (
    <ul className={styles.sidebarList}>
      <li className={styles.sidebarListItem}>
        <NavLink
          to='/me'
          className={({ isActive }) =>
            `${styles.sidebarListLink} ${
              isActive ? styles.sidebarListLink__active : ''
            }`
          }
        >
          <span className={styles.sidebarListIcon}>
            <i className='fas fa-user-graduate'></i>
          </span>
          Profile
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
          to='/classrooms/archived'
          className={({ isActive }) =>
            `${styles.sidebarListLink} ${
              isActive ? styles.sidebarListLink__active : ''
            }`
          }
        >
          <span className={styles.sidebarListIcon}>
            <i className='far fa-calendar-alt' />
          </span>
          Archived
        </NavLink>
      </li>
      <li className={styles.sidebarListItem}>
        <a
          href='https://github.com/namansingh73/chemClass'
          className={styles.sidebarListLink}
          target='_blank'
          rel='noreferrer'
        >
          <span className={styles.sidebarListIcon}>
            <i className='far fa-question-circle'></i>
          </span>
          About Us
        </a>
      </li>
    </ul>
  );
}

export default SidebarList;
