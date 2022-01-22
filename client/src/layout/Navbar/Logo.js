import React from 'react';
import icon from './education.png';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={icon} alt='chemclass' className={styles.icon} />
      <p className={styles.brandName}>ChemClass</p>
    </div>
  );
};

export default Logo;
