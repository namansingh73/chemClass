import axios from 'axios';
import { classroomActions } from './classroom-slice';

const loadClassrooms = () => {
  return async (dispatch) => {
    dispatch(classroomActions.setLoading());
    try {
      const res = await axios.get('/api/v1/classrooms/');
      dispatch(classroomActions.setClassrooms(res.data.data));
    } catch (err) {
      dispatch(classroomActions.setError(true));
    }
  };
};

const allClassroomActions = {
  ...classroomActions,
  loadClassrooms,
};

export default allClassroomActions;
