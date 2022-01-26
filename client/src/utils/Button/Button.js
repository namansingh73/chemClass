import React, { Fragment } from 'react';
import styles from './Button.module.css';

const Button = ({
  color,
  white,
  big,
  fullWidth,
  rounded,
  className,
  loading,
  children,
  ...otherProps
}) => {
  const style = {};

  if (color) {
    style['--current-color'] = `var(--color-${color})`;
    style['--current-color-lighter'] = `var(--color-${color}-lighter)`;
    style['--current-color-darker'] = `var(--color-${color}-darker)`;
  }

  let classNameAct = styles.button;
  if (white) {
    classNameAct += ' ' + styles.buttonWhite;
  }
  if (big) {
    classNameAct += ' ' + styles.buttonBig;
  }
  if (fullWidth) {
    classNameAct += ' ' + styles.buttonFullWidth;
  }
  if (rounded) {
    classNameAct += ' ' + styles.rounded;
  }
  if (loading) {
    classNameAct += ' ' + loading;
  }
  if (className) {
    classNameAct += ' ' + className;
  }

  return (
    <button className={classNameAct} style={style} {...otherProps}>
      {loading && (
        <Fragment>
          <i className='fas fa-circle-notch fa-spin'></i> Loading
        </Fragment>
      )}
      {!loading && children}
    </button>
  );
};

export default Button;
