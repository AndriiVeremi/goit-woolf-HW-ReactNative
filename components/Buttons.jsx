import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../styles/global";

const Buttons = ({ children, onPress, isButtonActive }) => {

  return (
    <TouchableOpacity style={isButtonActive ? styles.button : styles.disabledButton} onPress={onPress}>
    <Text style={[styles.buttonText, { color: isButtonActive ? Colors.white : "#BDBDBD" }]}>{children}</Text>
  </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.orange,
    height: 51,
    width: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: Colors.light_gray,
    height: 51,
    width: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});