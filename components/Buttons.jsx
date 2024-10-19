import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../styles/global";

const Buttons = ({ children, onPress, isButtonActive, buttonWidth }) => {
  return (
    <TouchableOpacity
      style={[
        isButtonActive ? styles.button : styles.disabledButton,
        buttonWidth ? styles.buttonType2 : styles.buttonType1,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          { color: isButtonActive ? Colors.white : "#BDBDBD" },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.orange,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: Colors.light_gray,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonType1: {
    width: "100%",
    height: 51,
  },
  buttonType2: {
    width: 70,
    height: 40,
  },
});
