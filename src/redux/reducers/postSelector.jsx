import { createSelector } from "@reduxjs/toolkit";

export const selectAllPosts = (state) => state.posts.postsArray;

export const selectPosts = (state) => state.posts.postsArray;



export const selectAllPosts2 = (state) => state.posts;



//   export const selectUsersPosts = userId =>
//     createSelector(selectAllPosts2, posts =>
//       posts.filter(post => post.userId === userId)
//     );