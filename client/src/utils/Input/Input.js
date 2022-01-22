import React from 'react';
import styles from './Input.module.css';

// props = {}
const Input = ({ id, label, type, placeholder, ...otherProps }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={styles.input}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
