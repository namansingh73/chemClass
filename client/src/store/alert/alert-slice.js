import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alertType: '',
    info: '',
    timeoutId: '',
  },
  reducers: {
    addAlert(state, action) {
      clearTimeout(state.timeoutId);
      state.alertType = action.payload.alertType;
      state.info = action.payload.info;
      state.timeoutId = action.payload.timeoutId;
    },

    removeAlert(state, action) {
      clearTimeout(state.timeoutId);
      state.alertType = '';
      state.info = '';
      state.timeoutId = '';
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
