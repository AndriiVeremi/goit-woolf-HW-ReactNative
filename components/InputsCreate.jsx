import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const InputsCreate = ({ placeholder, onTextChange, value }) => {
  return (
    <TextInput
      onChangeText={onTextChange}
      value={value}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#BDBDBD"
    />
  );
};

export default InputsCreate;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
  },
});
