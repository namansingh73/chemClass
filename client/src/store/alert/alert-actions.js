import { alertActions } from './alert-slice';

const alert = ({ alertType, info }) => {
  return (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(alertActions.clearAlert());
    }, 5000);
    dispatch(alertActions.setAlert({ alertType, info, timeoutId }));
  };
};

const allAlertActions = {
  ...alertActions,
  alert,
};

export default allAlertActions;
