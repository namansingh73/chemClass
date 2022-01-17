import React from 'react';
import styles from './SubjectCard.module.css';

const SubjectCard = ({ className, children, ...otherProps }) => {
  return (
    <div className={`${className} ${styles.subjectCard}`} {...otherProps}>
      {children}
    </div>
  );
};

export default SubjectCard;
