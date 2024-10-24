import React, { useState, useEffect, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import InputsCreate from "../components/InputsCreate";
import Buttons from "../components/Buttons";
import * as Location from "expo-location";
import { Colors, Fonts } from "../styles/global";

const CreatePostsScreen = ({ navigation }) => {
  const [namePhoto, setNamePhoto] = useState("");
  const [isButtonActive, setButtonActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);

  const handleNameChange = (value) => {
    setNamePhoto(value);
  };

  // Camera ---------------------------------

  // GeoLocation ---------------------------------

  useEffect(() => {
    if (!location) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }

        let geoLoc = await Location.getCurrentPositionAsync({});

        console.log("geoLoc-->", { ...geoLoc });

        setGeocode(geoLoc);

        const grantedLocation = await Location.reverseGeocodeAsync(
          geoLoc.coords
        );
        const country = grantedLocation[0]["country"];
        const city = grantedLocation[0]["city"];
        setLocation(`${country}, ${city}`);
      })();
    }
  }, []);

  useEffect(() => {
    if (namePhoto && geocode) {
      setButtonActive(true);
      return;
    }
    setButtonActive(false);
  }, [namePhoto, geocode]);

  const reset = () => {
    setNamePhoto("");
    setLocation("");
    setGeocode("");
  };

  const create = () => {
    Alert.alert("Credentials", `${namePhoto} + ${geocode} + ${location}`);
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgSection}>
        <View style={styles.imgContainer}>
          <View style={styles.photoView}></View>

          <TouchableOpacity style={styles.iconContainer}>
            <MaterialIcons
              name="photo-camera"
              size={24}
              color={Colors.text_gray}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.fotoWork}>Завантажте фото</Text>
      </View>

      <View>
        <View style={styles.positionContainer}>
          <InputsCreate
            value={namePhoto}
            onTextChange={handleNameChange}
            placeholder="Назва..."
          />
        </View>

        <View style={[styles.positionContainer, styles.positionContainerImg]}>
          <TouchableOpacity
          // onPressMap={() =>
          //   navigation.navigate("Maps", { location: item.geocode })
          // }
          >
            <Feather
              style={styles.inputImg}
              name="map-pin"
              size={24}
              color={Colors.text_gray}
            />
          </TouchableOpacity>
          <InputsCreate
            value={location}
            placeholder="Місцевість..."
            onChangeText={setLocation}
          />
        </View>

        <Buttons
          onPress={() => {
            navigation.navigate("Posts");
          }}
          buttonSize="large"
          isButtonActive={isButtonActive}
        >
          Опубліковати
        </Buttons>

        <View style={styles.treshBtn}>
          <Buttons buttonSize="medium">
            <Feather name="trash-2" size={24} color={Colors.text_gray} />
          </Buttons>
        </View>
      </View>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  imgSection: {
    marginBottom: 48,
  },
  imgContainer: {
    width: "100%",
    height: 240,
    backgroundColor: Colors.light_gray,
    borderColor: Colors.border_gray,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#BDBDBD30",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  fotoWork: {
    fontFamily: "roboto-regular",
    fontSize: Fonts.normal,
    color: Colors.text_gray,
  },
  positionContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.border_gray,
    marginBottom: 16,
  },
  treshBtn: {
    alignItems: "center",
    marginTop: 120,
  },
});
