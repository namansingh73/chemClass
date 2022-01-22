import React from 'react';
import styles from './Card.module.css';

const Card = ({ className, children, ...otherProps }) => {
  return (
    <div className={`${className} ${styles.card}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Card;
