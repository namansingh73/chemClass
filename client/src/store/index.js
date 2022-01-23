import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/auth-slice';
import alertSlice from './alert/alert-slice';

const store = configureStore({
  reducer: { auth: authSlice.reducer, alert: alertSlice.reducer },
});

export default store;
