import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost  } from "./postOperation";

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
  },
});

export const postReducer = postsSlice.reducer;
