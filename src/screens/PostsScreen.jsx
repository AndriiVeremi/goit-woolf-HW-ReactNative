import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Fonts } from "../../styles/global";
import Posts from "../components/Posts";
import { selectAllPosts } from "../redux/reducers/postSelector";
import { getPosts } from "../redux/reducers/postOperation";
import { selectUser } from "../redux/reducers/authSelector";

const PostsScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectUser);

  // console.log("\x1b[32m%s\x1b[0m", "post start----->", posts);
  // console.log("\x1b[34m%s\x1b[0m","user start----->", user);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.userAvatar} source={{ uri: user.photoURL }} />
        <View>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.fotoList}>
        {posts.length > 0 && (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Posts
                onPressComment={() => navigation.navigate("Comment", { postId: item.id })}
                onPressMap={() => navigation.navigate("Maps", { posts })}
                postImg={item.imageUrl}
                postName={item.namePhoto}
                postComment={item.comments.length}
                location={item.location.name}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: Colors.whites,
    borderColor: Colors.light_gray,
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 32,
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 8,
  },
  userName: {
    fontFamily: "roboto-bold",
    fontSize: Fonts.medium,
    color: Colors.black_primary,
  },
  userEmail: {
    fontFamily: "roboto-regular",
    fontSize: Fonts.small,
    color: Colors.black_primary,
  },
  fotoList: {
    width: "100%",
    height: "87%",
  },
  itemImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontFamily: "roboto-medium",
    fontSize: Fonts.normal,
    color: Colors.black_primary,
    marginBottom: 8,
  },
  itemInform: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemArea: {
    flexDirection: "row",
  },
  itemCommentNum: {
    fontFamily: "roboto-medium",
    fontSize: Fonts.normal,
    color: Colors.text_gray,
    marginLeft: 5,
  },
  itemAddres: {
    fontFamily: "roboto-medium",
    fontSize: Fonts.normal,
    color: Colors.black_primary,
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});
