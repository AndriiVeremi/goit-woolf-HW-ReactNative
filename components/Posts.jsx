import Feather from '@expo/vector-icons/Feather';
import {
    StyleSheet,
    Text,
    View,
    Image,
  } from "react-native";

const Posts = ({postImg, postName, postComment, location}) => {
    return (
      <View>
        <View style={styles.item}>
          <Image
            style={styles.itemImg}
            source={postImg}
          />
          <Text style={styles.itemName}>{postName}</Text>
        </View>
  
        <View style={styles.itemInform}>
          <View style={styles.itemArea}>
            <Feather name="message-circle" size={24} color="#BDBDBD" />
            <Text style={styles.itemCommentNum}>{postComment}</Text>
          </View>
  
          <View style={styles.itemArea}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={styles.itemAddres}>{location}</Text>
          </View>
        </View>
      </View>
    );
  };

  export default Posts;


  const styles = StyleSheet.create({
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
      justifyContent: "space-between",
      marginBottom: 32,
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
  