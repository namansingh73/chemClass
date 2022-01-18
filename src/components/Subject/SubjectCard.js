import React from 'react';
import styles from './SubjectCard.module.css';

const SubjectCard = ({ className, children, noPadding, ...otherProps }) => {
  return (
    <div
      className={`${className} ${styles.subjectCard} ${
        noPadding && styles.subjectCard__noPadding
      }`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default SubjectCard;
