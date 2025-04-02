import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { getAuth, updateProfile } from "firebase/auth";
import { styles } from "./InfoUser.styles";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../utils";

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);
  const [userInfo, setUserInfo] = useState(null);
  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      uploadImage(selectedImage.uri);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "usersInfo"), where("idUser", "==", uid));
    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setUserInfo(snapshot.docs[0].data());
      }
    });
  }, []);

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando imágen");
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath) => {
    // const q = query(
    //     collection(db, "usersInfo"),
    //     where("idUser", "==", uid)
    // )
    // onSnapshot(q, (snapshot) => {
    //     if (!snapshot.empty) {
    //         setUserInfo(snapshot.docs[0].data());
    //     }
    // })

    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    const auth = getAuth();
    updateProfile(auth.currentUser, {
      photoURL: imageUrl,
    });
    console.log("NEW DATA USERINFO", userInfo);
    const newData = {
      ...userInfo,
      photoURL: imageUrl,
    };
    newData.idUser = uid;

    const myDb = doc(db, "usersInfo", newData.idUser);

    await setDoc(myDb, newData);
    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material-community", name: "account" }}
        source={photoURL ? { uri: avatar } : undefined}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>

      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
