import React from 'react';
import ShowMoreTextAndLinkify from '../../../utils/ShowMoreTextAndLinkify/ShowMoreTextAndLinkify';
import styles from './MainContent.module.css';

const MainContent = (props) => {
  return (
    <div className={styles.mainContent}>
      <ShowMoreTextAndLinkify text={props.post.text} />
    </div>
  );
};

export default MainContent;
