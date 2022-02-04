import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/auth-slice';
import alertSlice from './alert/alert-slice';
import subjectSlice from './subject/subject-slice';
import classroomSlice from './classroom/classroom-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    subject: subjectSlice.reducer,
    classroom: classroomSlice.reducer,
  },
});

export default store;
