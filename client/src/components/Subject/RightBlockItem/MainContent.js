import React from 'react';
import styles from './MainContent.module.css';

const MainContent = (props) => {
  return <div className={styles.mainContent}>{props.post.text}</div>;
};

export default MainContent;
