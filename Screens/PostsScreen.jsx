import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Posts from "../components/Posts";

const DATA = [
  {
    id: "1",
    postImg: require("../assets/images/item1.jpg"),
    postName: "Ліс",
    postComment: "5",
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "2",
    postImg: require("../assets/images/item2.jpg"),
    postName: "Небо",
    postComment: "0",
    location: "Ukraine",
  },
];

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.userAvatar}
          source={require("../assets/images/User.png")}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Posts postImg={item.postImg} postName={item.postName} postComment={item.postComment} location={item.location}/>
          )}
          keyExtractor={(item) => item.id}
        />
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
  },
  userName: {
    fontFamily: "roboto-bold",
    fontSize: 13,
    color: 212121,
  },
  userEmail: {
    fontFamily: "roboto-regular",
    fontSize: 11,
    color: "#212121",
  },
  itemImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontFamily: "roboto-medium",
    fontSize: 16,
    color: "#212121",
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
    fontSize: 16,
    color: "#BDBDBD",
    marginLeft: 5,
  },
  itemAddres: {
    fontFamily: "roboto-medium",
    fontSize: 16,
    color: "#212121",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});
