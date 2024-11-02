import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "../redux/reducers/authSelector";
import { selectUserPost, selectAllPosts } from "../redux/reducers/postSelector";
import { getPosts } from "../redux/reducers/postOperation";
import { logoutDB } from "../redux/reducers/authOperation";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import Posts from "../components/Posts";

import { Colors, Fonts } from "../../styles/global";

import ImageBG from "../../assets/images/PhotoBG.jpg";
import LogOutButton from "../components/LogOutButton";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutDB());
  };

  const user = useSelector(selectUser);
  const userId = user.uid;
  // const posts = useSelector(selectUserPost(userId));
  const posts = useSelector(selectAllPosts);

  // console.log("Posts Array ---->", posts);

  // useEffect(() => {
  //   if (!user) return;
  //   dispatch(getPosts(userId));
  // }, [user]);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={ImageBG} style={styles.imageBg}>
        <View style={styles.contentBox}>
          <View>
            <Image style={styles.avatarBox} source={{ uri: user.photoURL }} />
          </View>

          <View style={styles.exitBtn}>
            <LogOutButton onPress={handleLogout} />
          </View>

          <Text style={styles.contentTitle}>{user.displayName}</Text>

          <View style={styles.fotoList}>
            {posts.length > 0 && (
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <Posts
                    onPressComment={() => navigation.navigate("Comment")}
                    onPressMap={() =>
                      navigation.navigate("Maps", { location: item.location })
                    }
                    postImg={item.imageUrl}
                    postName={item.namePhoto}
                    postComment={item.comments.length}
                    location={item.location.name}
                    postLike={item.like}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: "100%",
    height: "100%",
  },
  contentBox: {
    width: "100%",
    height: 665,
    backgroundColor: Colors.whites,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  avatarBox: {
    width: 120,
    height: 120,
    backgroundColor: Colors.light_gray,
    borderRadius: 16,
    position: "relative",
    top: -60,
  },
  avatarAdd: {
    position: "absolute",
    left: 107,
    top: 20,
  },
  exitBtn: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  exitBtnIcon: {
    width: 24,
    height: 30,
  },
  contentTitle: {
    fontFamily: "roboto-medium",
    fontSize: Fonts.extraLarge,
    top: -30,
  },
  fotoList: {
    width: "100%",
    height: 500,
  },
});
