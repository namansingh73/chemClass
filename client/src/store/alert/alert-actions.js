import { alertActions } from './alert-slice';

const alert = ({ alertType, info }) => {
  return (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(alertActions.removeAlert());
    }, 30000);

    console.log(timeoutId);

    dispatch(alertActions.addAlert({ alertType, info, timeoutId }));
  };
};

const allAlertActions = {
  ...alertActions,
  alert,
};

export default allAlertActions;
