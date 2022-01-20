import React from 'react';
import styles from './Navbar.module.css';
import Logo from './Logo';
import Search from './Search';
import Notifications from './Notifications';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <Search />
      <Notifications />
    </nav>
  );
};

export default Navbar;
