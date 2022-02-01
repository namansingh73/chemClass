import { createSlice } from '@reduxjs/toolkit';

const subjectSlice = createSlice({
  name: 'subject',
  initialState: null,
  reducers: {
    initSubject(state, action) {
      return action.payload;
    },

    // payload -> updated post
    updatePost(state, action) {
      const updatedPost = action.payload;
      const idx = state.posts.findIndex((post) => post._id === updatedPost._id);
      state.posts[idx] = updatedPost;
    },

    newPost(state, action) {
      state.posts = [action.payload, ...state.posts];
    },

    // payload -> postId, commentId
    deleteComment(state, action) {
      const post = state.posts.find(
        (post) => post._id === action.payload.postId
      );

      post.comments = post.comments.filter(
        (comment) => comment._id !== action.payload.commentId
      );
    },
  },
});

export const subjectActions = subjectSlice.actions;

export default subjectSlice;
