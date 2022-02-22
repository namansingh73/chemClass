import React from 'react';
import styles from './Navbar.module.css';
import Logo from './Logo';
import Search from './Search';
import Notifications from './Notifications';

const Navbar = (props) => {
  return (
    <nav className={styles.nav}>
      <Logo
        toggleSidebar={props.toggleSidebar}
        sidebarOpenResponsive={props.sidebarOpenResponsive}
      />
      <Search />
      <Notifications />
    </nav>
  );
};

export default Navbar;
