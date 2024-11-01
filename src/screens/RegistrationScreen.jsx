import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { registerDB } from "../redux/reducers/authOperation";

import Buttons from "../components/Buttons";
import Inputs from "../components/InputsSing";
import ImageBG from "../../assets/images/PhotoBG.jpg";
import AddAvatar from "../../assets/images/add.png";
import { Colors, Fonts } from "../../styles/global";

const RegistrationScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const addAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("permissionResult -->", permissionResult);
    if (permissionResult.granted === false) {
      alert("Ви відмовилися від доступ до ваших фотографій!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const isNameValid = name.length >= 2;
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length >= 6;

    if (isNameValid && isEmailValid && isPasswordValid) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [name, email, password]);

  const navi = () => {
    navigation.navigate("Login");
  };

  const signUp = () => {
    if (!profilePhoto) {
      Alert.alert("Аватар є обовязковою");
      return;
    }

    if (email && password && name && profilePhoto) {
      dispatch(
        registerDB({
          inputEmail: email,
          inputPassword: password,
          inputLogin: name,
          profilePhoto,
        })
      );
      reset();
    }
  };

  useEffect(() => {
    if (authError) {
      Alert.alert("Помилка");
    }
  }, [authError]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={ImageBG} style={styles.imageBg}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.contentBox}>
              <View style={styles.avatarBox}>
                <Image
                  style={styles.avatarImg}
                  source={{ uri: profilePhoto }}
                />

                <TouchableOpacity onPress={addAvatar} style={styles.avatarAdd}>
                  <Image style={styles.tinyLogo} source={AddAvatar} />
                </TouchableOpacity>
              </View>

              <Text style={styles.contentTitle}>Реєстрація</Text>

              <Inputs
                value={name}
                onTextChange={handleNameChange}
                placeholder="Логін"
                showPassword={true}
                keyboard="default"
              />

              <Inputs
                value={email}
                onTextChange={handleEmailChange}
                placeholder="Адреса електронної пошти"
                showPassword={true}
                keyboard="email-address"
              />

              <View style={styles.inputPass}>
                <Inputs
                  value={password}
                  onTextChange={handlePasswordChange}
                  placeholder="Пароль"
                  keyboard="numeric"
                  showPassword={showPassword}
                />
                <TouchableOpacity
                  style={styles.passHide}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.passHideText}>
                    {showPassword ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Buttons
                buttonSize="large"
                isButtonActive={isButtonActive}
                onPress={signUp}
              >
                Зареєстуватися
              </Buttons>

              <View style={styles.textContainer}>
                <Text style={styles.text}>Вже є акаунт?</Text>
                <TouchableOpacity onPress={navi}>
                  <Text style={[styles.text, styles.textSolid]}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  contentBox: {
    width: "100%",
    height: 549,
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
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "relative",
  },
  avatarAdd: {
    position: "absolute",
    left: 107,
    top: 80,
  },
  contentTitle: {
    fontFamily: "roboto-medium",
    fontSize: Fonts.extraLarge,
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.border_gray,
    backgroundColor: Colors.light_gray,
    width: "100%",
    height: 50,
    padding: 16,
    marginBottom: 16,
  },
  inputPass: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    marginBottom: 43,
  },
  passHide: {
    position: "relative",
    left: -90,
    top: 15,
  },
  passHideText: {
    color: Colors.blues,
  },
  textContainer: {
    flexDirection: "row",
  },
  text: {
    color: Colors.blues,
    fontFamily: "roboto-regular",
    fontSize: Fonts.normal,
  },
  textSolid: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});