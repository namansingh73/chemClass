import React from 'react';
import styles from './ClassroomContainer.module.css';

const ClassroomContainer = (props) => {
  return <div className={styles.rootContainer}>{props.children}</div>;
};

export default ClassroomContainer;
