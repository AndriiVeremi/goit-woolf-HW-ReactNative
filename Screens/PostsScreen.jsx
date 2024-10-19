import Feather from '@expo/vector-icons/Feather';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

const Item = () => {
  return (
    <View>
      <View style={styles.item}>
        <Image
          style={styles.itemImg}
          source={require("../assets/images/item1.jpg")}
        />
        <Text style={styles.itemName}>Ліс</Text>
      </View>

      <View style={styles.itemInform}>
        <View style={styles.itemArea}>
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={styles.itemCommentNum}>0</Text>
        </View>

        <View style={styles.itemArea}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.itemAddres}>Ivano-Frankivs'k Region, Ukraine</Text>
        </View>
      </View>
    </View>
  );
};

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

      {/* список фоток */}
      <View>
        <Item />
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
    alignItems: "center"
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
    color: '#212121',
  },
  item: {},
  itemImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontFamily: "roboto-medium",
    fontSize: 16,
    color: '#212121',
    marginBottom: 8,
  },
  itemInform: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemArea: {
    flexDirection: "row",
  },
  itemCommentNum: {
    fontFamily: "roboto-medium",
    fontSize: 16,
    color: '#BDBDBD',
    marginLeft: 5,
  },
  itemAddres: {
    fontFamily: "roboto-medium",
    fontSize: 16,
    color: '#212121',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
