import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, addComment } from "./postOperation";


const initialState = {
  postsArray: [],
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        if (action.payload) {
          state.postsArray = [...action.payload];
        }
        state.isLoading = false;
      })
      .addCase(getPosts.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getPosts.rejected, (state, _) => {
        state.isLoading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postsArray.push(action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          post.comments = [...(post.comments || []), comment];
        }
      });
  },
});

export const postReducer = postsSlice.reducer;
