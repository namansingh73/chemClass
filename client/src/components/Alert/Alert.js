import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import alertActions from '../../store/alert/alert-actions';
import styles from './Alert.module.css';

const Alert = (props) => {
  const dispatch = useDispatch();
  const { alertType, info } = useSelector(({ alert }) => alert);

  const clearAlertHandler = () => {
    dispatch(alertActions.clearAlert());
  };

  if (info === '') {
    return null;
  }

  let alertIcon = 'fas fa-info-circle';
  let color = 'blue';

  if (alertType === 'Success') {
    alertIcon = 'fas fa-thumbs-up';
    color = 'green';
  } else if (alertType === 'Error') {
    alertIcon = 'fas fa-exclamation-circle';
    color = 'red';
  } else if (alertType === 'Warning') {
    alertIcon = 'fas fa-exclamation-triangle';
    color = 'yellowOrange';
  }

  return (
    <div
      className={styles.alert}
      style={{
        '--current-color': `var(--color-${color})`,
      }}
    >
      <span className={styles.icon}>
        <i className={alertIcon} />
      </span>

      <div className={styles.content}>
        <div className={styles.heading}>{alertType}</div>
        <p className={styles.info}>{info}</p>
      </div>

      <button className={styles.closeBtn} onClick={clearAlertHandler}>
        {' '}
        &#10799;{' '}
      </button>
    </div>
  );
};

export default Alert;
