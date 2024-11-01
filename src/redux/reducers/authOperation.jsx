import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../config";

export const registerDB = createAsyncThunk(
  "auth/signup",
  async ({ inputEmail, inputPassword, inputLogin, profilePhoto }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
      const profileImg = await fetch(profilePhoto);
      const bytes = await profileImg.blob();
      const createdUrl = `profiles/${Date.now()}`;
      const profileImageRef = ref(storage, createdUrl);
      await uploadBytes(profileImageRef, bytes);
      const profileImageUrl = await getDownloadURL(ref(storage, createdUrl));

      await updateProfile(auth.currentUser, {
        displayName: inputLogin,
        photoURL: profileImageUrl,
      });
      const { email, displayName, photoURL, uid } = auth.currentUser;
      await setDoc(doc(db, "posts", uid), {
        posts: {},
      });
      return { email, login: displayName, userId: uid, photo: photoURL };
    } catch (error) {
      console.error("SIGNUP ERROR:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginDB = createAsyncThunk(
  "auth/login",
  async ({ inputEmail, inputPassword }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      const { email, displayName, photoURL, uid } = auth.currentUser;
      const profileImageUrl = await getDownloadURL(ref(storage, photoURL));
      return { email, login: displayName, userId: uid, photo: profileImageUrl };
    } catch (error) {
      console.log("SIGNIN ERROR:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutDB = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
