import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-native-elements";
import { doc, onSnapshot } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { calculateDistance } from "../../../utils/calculateDistance";
import * as Location from "expo-location";
import { formatDate } from "../../../utils/formatDate";
import Avatar from "../../Shared/Avatar/Avatar";
// import { BtnFavoriteJob } from "../../Shared/BtnFavorite/BtnFavoriteJob";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "../../Shared";
import { ServiceList } from "../../ServiceSeeMore/ServiceList/ServiceList";
import Toast from "react-native-toast-message";

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
    services,
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
    onSnapshot(doc(db, "usersInfo", idUser), (doc) => {
      setUserInfo(doc.data());
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Permiso de ubicación no otorgado"
        })
        console.error("Permiso de ubicación no otorgado. Post.js");

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
    const scren =
      nameScreen === "JobScreen"
        ? screen.feed.jobSeeMore
        : screen.feed.serviceSeeMore;

    if (!scren) {
      console.error("Error: screen.feed.serviceSeeMore es undefined");
      return;
    }

    navigation.navigate(scren, { id: id });
  };

  // const seeMore = () => {
  //   navigation.navigate(screen.feed.jobSeeMore, { id: id });
  // }; //Cambio entrante

  const seeProfile = () => {
    if (userInfo.idUser) {
      navigation.navigate(screen.account.seeProfile, {
        idUser: userInfo.idUser,
      });
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "No se pudo obtener el ID del usuario."
      })
      console.error("No se pudo obtener el ID del usuario. Post.js");
    }
  };

  return (
    <Card containerStyle={{ paddingBottom: 15 }}>
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
        {/* <BtnFavoriteJob id={id} /> */}
      </View>

      {images[0] ? (
        <Image
          source={{ uri: images[0] }}
          style={{ width: "100%", height: 200 }}
          onPress={() => setShowModal(true)}
        />
      ) : null}

      <View style={{ padding: 10 }}>
        {/* En caso que haya servicios los renderiza, sino muestra la categoria de empleo  */}
        {services ? <ServiceList services={services} /> : <Text style={{ fontSize: 15, fontWeight: "bold" }}>{category}</Text>}
        {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>{description}</Text> */}
        <Text>{description}</Text>
        <Text>Horarios: {schedules}</Text>
        <Text>
          Ubicación: {address} (a {distanceInKm})
        </Text>
        {remuneration ? <Text>Remuneración: ${remuneration}</Text> : null}
      </View>
      <View style={{ paddingBottom: 10 }}>
        <Button
          title="Ver más"
          type="outline"
          onPress={() => seeMore(screenName)}
        />
      </View>

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
