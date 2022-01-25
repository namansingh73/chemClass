import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loadUserPending: true,
    cannotLoad: false,
  },
  reducers: {
    resetAuth(state) {
      state.user = null;
      state.loadUserPending = true;
      state.cannotLoad = false;
    },

    setCannotLoad(state) {
      state.user = null;
      state.loadUserPending = false;
      state.cannotLoad = true;
    },

    loadedUser(state, action) {
      state.user = action.payload;
      state.loadUserPending = false;
      state.cannotLoad = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
