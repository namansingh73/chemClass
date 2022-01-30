import React from 'react';
import styles from './Tooltip.module.css';

const Tooltip = ({
  children,
  hoverText,
  direction,
  className,
  DomElement,
  ...otherProps
}) => {
  DomElement = DomElement || 'div';

  let directionClassName = '';

  if (direction === 'left') {
    directionClassName = styles.tooltipElement__left;
  } else if (direction === 'right') {
    directionClassName = styles.tooltipElement__right;
  } else if (direction === 'top') {
    directionClassName = styles.tooltipElement__top;
  }

  return (
    <DomElement className={`${className} ${styles.tooltip}`} {...otherProps}>
      {children}
      <div className={`${styles.tooltipElement} ${directionClassName}`}>
        {hoverText}
      </div>
    </DomElement>
  );
};

export default Tooltip;
