import React from 'react';
import icon from './education.png';
import styles from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={styles.logo}>
      <div className={styles.hamburger} onClick={props.toggleSidebar}>
        <div
          className={`${styles.hamburgerIcon} ${
            props.sidebarOpenResponsive && styles.hamburgerIcon__cross
          }`}
        ></div>
      </div>
      <img src={icon} alt='chemclass' className={styles.icon} />
      <p className={styles.brandName}>ChemClass</p>
    </div>
  );
};

export default Logo;
