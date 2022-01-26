import React from 'react';
import ReactDOM from 'react-dom';
import styles from './PopupCard.module.css';

const PopupPortal = (props) => {
  return ReactDOM.createPortal(
    props.children,
    document.getElementById('popup')
  );
};

const PopupCard = (props) => {
  return (
    <PopupPortal>
      <div className={styles.backdrop} onClick={props.onClose}></div>
      <div className={styles.popupCard}>
        <div className={styles.closeBtnContainer}>
          <button className={styles.closeBtn} onClick={props.onClose}>
            {' '}
            &#10799;{' '}
          </button>
        </div>
        <div className={styles.body}>{props.children}</div>
      </div>
    </PopupPortal>
  );
};

export default PopupCard;
