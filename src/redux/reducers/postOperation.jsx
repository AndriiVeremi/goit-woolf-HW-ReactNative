import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, getDocs, updateDoc, collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../config";



export const createPost = createAsyncThunk("posts/create", async ({ userId, newPost }, thunkAPI) => {
  try {
    const img = await fetch(newPost.imageUrl);
    const bytes = await img.blob();
    const randomNumber = Date.now();
    const createdUrl = `posts/${randomNumber}`;
    const postImageRef = ref(storage, createdUrl);
    
 
    await uploadBytes(postImageRef, bytes);
    const url = await getDownloadURL(ref(storage, createdUrl));

   
    const postRef = collection(db, "posts"); 
    await addDoc(postRef, {
      ...newPost,
      imageUrl: url,
      userId: userId, 
      createdAt: Date.now() 
    });

    return { ...newPost, imageUrl: url, userId };
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const getPosts = createAsyncThunk("posts/fetchAll", async (_, thunkAPI) => {
  try {
    const postsCollectionRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsCollectionRef);
    
    const allPosts = [];
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      postData.id = doc.id;
      allPosts.push(postData);
    });

   
    for (const post of allPosts) {
      if (post.imageUrl) {
        const url = await getDownloadURL(ref(storage, post.imageUrl));
        post.imageUrl = url;
      }
    }

    return allPosts;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

