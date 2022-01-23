import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loadingUser: false,
    cannotLoad: false,
  },
  reducers: {
    resetAuth(state) {
      state.user = null;
      state.loadingUser = false;
      state.cannotLoad = false;
    },

    setLoading(state) {
      state.user = null;
      state.loadingUser = true;
      state.cannotLoad = false;
    },

    setCannotLoad(state) {
      state.user = null;
      state.loadingUser = false;
      state.cannotLoad = true;
    },

    loadedUser(state, action) {
      state.user = action.payload;
      state.loadingUser = false;
      state.cannotLoad = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
