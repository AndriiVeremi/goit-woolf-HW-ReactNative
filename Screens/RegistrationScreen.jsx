import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert
} from "react-native";

import Buttons from "../components/Buttons";
import Inputs from "../components/Inputs";
import ImageBG from "../assets/images/PhotoBG.jpg";
import Colors from "../styles/global";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);

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

  useEffect(() => {
    if (name && email && password) {
      setButtonActive(true);
      return;
    }
    setButtonActive(false);
  }, [name, email, password]);

  const signUp = () => {
    Alert.alert("Credentials", `${name} + ${email} + ${password}`);
    console.log("name-->", name);
    console.log("email-->", email);
    console.log("password-->", password);
    reset()
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ImageBackground source={ImageBG} style={styles.imageBg}>
            <View style={styles.contentBox}>
              <View style={styles.avatarBox}>
                <Pressable style={styles.avatarAdd}>
                  <Image
                    style={styles.tinyLogo}
                    source={require("../assets/images/add.png")}
                  />
                </Pressable>
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

              <Buttons isButtonActive={isButtonActive} onPress={signUp}>Зареєстуватися</Buttons>

              <View style={styles.textContainer}>
                <Text style={styles.text}>Вже є акаунт?</Text>
                <TouchableOpacity>
                  <Text style={[styles.text, styles.textSolid]}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
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
  },
  contentBox: {
    width: "100%",
    height: 549,
    backgroundColor: Colors.white,
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
    position: "relative",
    left: 107,
    top: 80,
  },
  contentTitle: {
    fontFamily: "roboto-medium",
    fontSize: 30,
    marginBottom: 32,
  },
  contentTitle: {
    fontFamily: "roboto-medium",
    fontSize: 30,
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
    color: Colors.blue,
  },
  textContainer: {
    flexDirection: "row",
  },
  text: {
    color: Colors.blue,
    fontFamily: "roboto-regular",
    fontSize: 16,
  },
  textSolid: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});
