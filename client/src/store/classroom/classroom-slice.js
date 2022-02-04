import { createSlice } from '@reduxjs/toolkit';

const classroomSlice = createSlice({
  name: 'classroom',
  initialState: {
    classrooms: null,
    loading: true,
    error: false,
    searchParameter: '',
  },
  reducers: {
    setLoading(state, action) {
      state.classrooms = null;
      state.loading = true;
      state.error = false;
    },

    setClassrooms(state, action) {
      state.classrooms = action.payload;
      state.loading = false;
      state.error = false;
    },

    setError(state, action) {
      state.classrooms = null;
      state.loading = false;
      state.error = true;
    },

    updateSearchParamter(state, action) {
      state.searchParameter = action.payload;
    },
  },
});

export const classroomActions = classroomSlice.actions;

export default classroomSlice;
