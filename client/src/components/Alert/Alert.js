import React from 'react';
import { useDispatch } from 'react-redux';
import alertActions from '../../store/alert/alert-actions';
import styles from './Alert.module.css';

const Alert = (props) => {
  const dispatch = useDispatch();

  // dispatch(
  //   alertActions.addAlert({
  //     info: 'a;j;af',
  //     alertType: 'klaih',
  //   })
  // );

  const clickHandler = () => {
    dispatch(alertActions.removeAlert());
  };

  return (
    <div className={styles.alert}>
      <span
        className={styles.icon}
        onClick={() => {
          dispatch(
            alertActions.alert({
              alertType: 'akjhf',
              info: 'ak',
            })
          );
        }}
      >
        <i className={props.icon} />
      </span>

      <div className={styles.content}>
        <div className={styles.heading}>{props.heading}</div>
        <p className={styles.info}>{props.info}</p>
      </div>

      <button className={styles.closeBtn} onClick={clickHandler}>
        {' '}
        &#10799;{' '}
      </button>
    </div>
  );
};

export default Alert;
