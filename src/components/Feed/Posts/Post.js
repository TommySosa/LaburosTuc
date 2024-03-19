import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-native-elements";
import { doc, onSnapshot } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { calculateDistance } from "../../../utils/calculateDistance";
import * as Location from "expo-location";
import { formatDate } from "../../../utils/formatDate";
import Avatar from "../../Shared/Avatar/Avatar";
import { BtnFavoriteJob } from "../../Shared/BtnFavorite/BtnFavoriteJob";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "../../Shared";

export default function Post({ post, screenName }) {
  const {
    schedules,
    address,
    location,
    category,
    createdAt,
    remuneration,
    id,
    description,
    images,
    idUser,
  } = post;
  const [userLocation, setUserLocation] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prev) => !prev);

  if (!createdAt) {
    return null;
  }
  const formattedDate = formatDate(createdAt);

  useEffect(() => {
    onSnapshot(doc(db, "usersInfo", post.idUser), (doc) => {
      setUserInfo(doc.data());
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso de ubicación no otorgado");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  let distanceInKm = "";
  if (userLocation) {
    const distance = calculateDistance(userLocation, location);
    distanceInKm = `${distance} km`;
  }

  const seeMore = (nameScreen) => {
    console.log("nameScreen", nameScreen);
    const scren = nameScreen === 'JobScreen' ? screen.feed.jobSeeMore : screen.feed.serviceSeeMore;
    console.log("scren", scren);
    navigation.navigate(scren, { id: id });
  };

  const seeProfile = () => {
    if (userInfo.idUser) {
      console.log("ID USER =", userInfo.idUser);
      navigation.navigate(screen.account.seeProfile, {
        idUser: userInfo.idUser,
      });
    } else {
      console.error("No se pudo obtener el ID del usuario.");
    }
  };

  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginRight: 10 }}>
          {userInfo && (
            <Avatar
              photoURL={userInfo.photoURL}
              onPress={seeProfile}
              width={50}
              height={50}
            />
          )}
        </View>
        <View>
          <Text>{userInfo ? userInfo.email : ""}</Text>
          <Text>{formattedDate}</Text>
        </View>
        <BtnFavoriteJob id={id} />
      </View>

      <Image
        source={{ uri: post.images[0] }}
        style={{ width: "100%", height: 200 }}
        onPress={() => setShowModal(true)}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{category}</Text>
        <Text>{description}</Text>
        <Text>Horarios: {schedules}</Text>
        <Text>
          Ubicación: {address} (a {distanceInKm})
        </Text>
        <Text>
          {post.remuneration ? `Remuneración: $${post.remuneration}` : null}
        </Text>
      </View>
      <Button
        title="Ver más"
        type="outline"
        onPress={() => seeMore(screenName)}
        containerStyle={{ marginTop: 10 }}
      />

      <Modal show={showModal} close={onCloseOpenModal}>
        <View style={{ width: "100%", height: 500 }}>
          <Image
            source={{ uri: post.images[0] }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
      </Modal>
    </Card>
  );
}
