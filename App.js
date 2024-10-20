import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import {Colors} from "./styles/global";

export default function App() {

  const [loaded, error] = useFonts({
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync() ;
    }
  });

  if (!loaded || error) {
    return <ActivityIndicator/>;
  }

  return (
    <View style={styles.container}>

      {/* <RegistrationScreen /> */}
      {/* <LoginScreen /> */}
      {/* <PostsScreen/> */}
      {/* <CreatePostsScreen/> */}
      {/* <CommentsScreen/> */}
      <ProfileScreen/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.whites,
    justifyContent: "center",
  },
});
