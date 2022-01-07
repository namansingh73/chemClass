import React from 'react';
import styles from './MainConatiner.module.css';

const MainConatiner = (props) => {
  return <div className={styles.mainContainer}>{props.children}</div>;
};

export default MainConatiner;
