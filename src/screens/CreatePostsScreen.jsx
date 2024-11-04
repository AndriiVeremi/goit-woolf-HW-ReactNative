import React, { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Colors, Fonts } from "../../styles/global";
import InputsCreate from "../components/InputsCreate";
import Buttons from "../components/Buttons";
import PhotoCamera from "../components/PhotoCamera";
import GalleryModal from "../components/GalleryModal";
import LocationFetcher from "../components/PhotoLocation";
import { createPost } from "../redux/reducers/postOperation";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/reducers/authSelector";

const CreatePostsScreen = ({ navigation }) => {
  const [namePhoto, setNamePhoto] = useState("");
  const [isButtonActive, setButtonActive] = useState(false);
  const [isButtonTreshActive, setButtonTreshActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isCameraActive, setCameraActive] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.uid;

  const handleNameChange = (value) => {
    setNamePhoto(value);
  };

  const handleSelectPhoto = (uri) => {
    setPhotoUri(uri);
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    if (namePhoto && location && photoUri) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }

    if (namePhoto || location || photoUri) {
      setButtonTreshActive(true);
    } else {
      setButtonTreshActive(false);
    }
  }, [namePhoto, location, photoUri]);

  const reset = () => {
    setNamePhoto("");
    setLocation(null);
    setGeocode(null);
    setPhotoUri(null);
  };

  const onSubmit = () => {
    const newPost = {
      id: Date.now(),
      userId,
      namePhoto,
      location: {
        geo: geocode,
        name: location,
      },
      imageUrl: photoUri,
      likes: 0,
      comments: [],
    };

    dispatch(createPost({ userId, newPost }));
    reset();
  };

  return (
    <View style={styles.container}>
      <LocationFetcher setLocation={setLocation} setGeocode={setGeocode} />

      <View style={styles.imgSection}>
        <View style={styles.imgContainer}>
          {photoUri && (
            <Image
              source={{ uri: photoUri }}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          )}

          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} />
          ) : isCameraActive ? (
            <PhotoCamera style={styles.came} onCapture={handleSelectPhoto} />
          ) : (
            <TouchableOpacity onPress={() => setCameraActive(true)}>
              <Text style={styles.activateCameraText}>Включити камеру</Text>
            </TouchableOpacity>
          )}
        </View>

        {photoUri ? (
          <Text style={styles.fotoWork} onPress={() => setPhotoUri(null)}>
            Видалити фото
          </Text>
        ) : (
          <TouchableOpacity onPress={() => setIsGalleryOpen(true)}>
            <Text style={styles.fotoWork}>Завантажте фото</Text>
          </TouchableOpacity>
        )}
      </View>

      <GalleryModal
        visible={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectPhoto={handleSelectPhoto}
      />

      <View>
        <View style={styles.positionContainer}>
          <InputsCreate
            value={namePhoto}
            onTextChange={handleNameChange}
            placeholder="Назва..."
          />
        </View>

        <View style={[styles.positionContainer, styles.positionContainerImg]}>
          <Feather
            style={styles.inputImg}
            name="map-pin"
            size={24}
            color={location ? Colors.oranges : Colors.text_gray}
          />

          <InputsCreate
            value={location}
            placeholder="Місцевість..."
            onChangeText={setLocation}
          />
        </View>

        <Buttons
          onPress={() => {
            navigation.navigate("Posts");
            onSubmit();
          }}
          buttonSize="large"
          isButtonActive={isButtonActive}
        >
          Опубліковати
        </Buttons>

        <TouchableOpacity style={styles.treshBtn}>
          <Buttons
            buttonSize="medium"
            onPress={() => reset()}
            isButtonActive={isButtonTreshActive}
          >
            <Feather
              name="trash-2"
              size={24}
              color={!isButtonTreshActive ? Colors.text_gray : Colors.whites}
            />
          </Buttons>
        </TouchableOpacity>
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
    backgroundColor: Colors.whites,
    borderColor: Colors.light_gray,
    borderWidth: 1,
  },
  imgSection: {
    marginBottom: 48,
  },
  inputImg: {
    marginRight: 5,
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
    overflow: "hidden",
  },
  came: {
    width: "100%",
    height: 100,
    borderRadius: 8,
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.border_gray,
    marginBottom: 16,
  },
  positionContainerImg: {
    marginRight: 20,
  },
  treshBtn: {
    alignItems: "center",
    marginTop: 120,
  },
  activateCameraText: {
    color: Colors.text_gray,
    fontSize: Fonts.normal,
    fontFamily: "roboto-regular",
  },
});
