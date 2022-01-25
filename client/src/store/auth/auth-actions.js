import axios from 'axios';
import { authActions } from './auth-slice';

const loadUser = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/v1/users/me');
      const user = res.data.data;

      dispatch(authActions.loadedUser(user));
    } catch (err) {
      dispatch(authActions.setCannotLoad());
    }
  };
};

const allAuthActions = { ...authActions, loadUser };

export default allAuthActions;
