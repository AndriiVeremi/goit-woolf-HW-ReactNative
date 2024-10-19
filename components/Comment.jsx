import { StyleSheet, Text, View, Image } from "react-native";

const Comment = ({ textComment, dateComment, userAvatar, isEven }) => {
  return (
    <View
      style={[
        styles.containerComments,
        isEven ? styles.evenComment : styles.oddComment,
      ]}
    >
      {!isEven && (
        <Image
          style={[styles.containerAvatar, styles.avatarLeft]}
          source={userAvatar}
        />
      )}
      <View style={styles.containerText}>
        <Text style={styles.text}>{textComment}</Text>
        <View>
          <Text style={styles.textData}>{dateComment}</Text>
        </View>
      </View>
      {isEven && (
        <Image
          style={[styles.containerAvatar, styles.avatarRight]}
          source={userAvatar}
        />
      )}
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  containerComments: {
    flexDirection: "row",
    marginBottom: 16,
  },
  evenComment: {
    justifyContent: "flex-end",
  },
  oddComment: {
    justifyContent: "flex-start",
  },
  containerAvatar: {
    width: 28,
    height: 28,
    backgroundColor: "#F6F6F6",
    borderRadius: 28,
  },
  containerText: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    padding: 16,
    maxWidth: "70%",
  },
  text: {
    fontFamily: "roboto-regular",
    fontSize: 13,
  },
  textData: {
    fontFamily: "roboto-regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  avatarLeft: {
    marginRight: 16,
  },
  avatarRight: {
    marginLeft: 16,
  },
});
