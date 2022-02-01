import React from 'react';
import styles from './Input.module.css';

// props = {}
const Input = ({ id, label, type, textarea, placeholder, ...otherProps }) => {
  let DomElement = 'input';

  if (textarea) {
    DomElement = 'textarea';
  }

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <DomElement
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${styles.input}  ${styles.textarea}`}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
