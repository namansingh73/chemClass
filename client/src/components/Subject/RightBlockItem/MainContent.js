import React from 'react';
import Linkify from 'linkify-react';
import styles from './MainContent.module.css';

const MainContent = (props) => {
  return (
    <div className={styles.mainContent}>
      <Linkify options={{ target: '_blank' }}> {props.post.text}</Linkify>
    </div>
  );
};

export default MainContent;
