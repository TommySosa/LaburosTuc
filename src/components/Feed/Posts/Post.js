import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Image } from "react-native-elements";
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
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
import { deleteObject, getStorage, ref } from "firebase/storage";
import { getStoragePathFromUrl } from "../../../utils/getStoragePathFromUrl";

export default function Post({ post, screenName, auth, isAdmin }) {
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onCloseDeleteModal = () => setShowDeleteModal((prev) => !prev);

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

  const seeMore = () => {
    const scren =
      screenName === "JobScreen"
        ? screen.feed.jobSeeMore
        : screen.feed.serviceSeeMore;

    if (!scren) {
      console.error("Error al navegar a la pantalla de más información. Post.js");
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al navegar a la pantalla de más información"
      })
      return;
    }

    navigation.navigate(scren, { id: id });
  };

  const editPost = () => {
    const scren =
      screenName === "JobScreen"
        ? screen.jobs.editJob
        : screen.services.editService;

    if (!scren) {
      console.error("Error al navegar a la pantalla de más información. Post.js");
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al navegar a la pantalla de más información"
      })
      return;
    }
    navigation.navigate(scren, { id: id });
  }

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

  const deletePost = async () => {
    if (!auth || !userInfo || userInfo.idUser !== auth.uid && !isAdmin) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "No tienes permisos para eliminar este post.",
      });
      return;
    }

    try {
      const storage = getStorage();

      // Eliminar imágenes del Storage si existen
      if (images && images.length > 0) {
        await Promise.all(
          images.map(async (imageUrl) => {
            const storagePath = getStoragePathFromUrl(imageUrl);
            if (storagePath) {
              try {
                const imageRef = ref(storage, storagePath);
                await deleteObject(imageRef);
              } catch (error) {
                console.error("Error eliminando imagen:", error);
              }
            }
          })
        );
      }

      const collectionName = screenName === "JobScreen" ? "jobs" : "services";
      await deleteDoc(doc(db, collectionName, id));

      const favoritesCollection =
        screenName === "JobScreen" ? "favoritesJobs" : "favoritesServices";

      // Buscar en favoritos los registros con el mismo ID de publicación
      const q = query(collection(db, favoritesCollection), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      // Eliminar cada documento encontrado en la colección de favoritos
      const deleteFavoritesPromises = querySnapshot.docs.map((docFav) =>
        deleteDoc(doc(db, favoritesCollection, docFav.id))
      );
      await Promise.all(deleteFavoritesPromises);


      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Publicación eliminada con éxito",
      });

    } catch (error) {
      console.error("Error eliminando post:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al eliminar la publicación.",
      });
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
        <View style={{ flex: 1 }}>
          <Text>{userInfo ? userInfo.email : ""}</Text>
          <Text>{formattedDate}</Text>
        </View>
        {(auth && userInfo && userInfo.idUser === auth.uid) || isAdmin ? (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Icon
              type="material-community"
              name="pencil-outline"
              color="#646464"
              onPress={editPost}
              containerStyle={{ marginHorizontal: 10 }}
            />
            <Icon
              type="material-community"
              name="delete-outline"
              color="red"
              onPress={onCloseDeleteModal}
              containerStyle={{ marginHorizontal: 10 }}
            />
          </View>
        ) : null}
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
          onPress={() => seeMore()}
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

      <Modal show={showDeleteModal} close={onCloseDeleteModal}>
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            ¿Estás seguro de eliminar esta publicación?
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
            <Button title="Cancelar" type="outline" onPress={onCloseDeleteModal} />
            <Button
              title="Eliminar"
              buttonStyle={{ backgroundColor: "red" }}
              onPress={async () => {
                await deletePost();
                onCloseDeleteModal();
              }}
            />
          </View>
        </View>
      </Modal>

    </Card>
  );
}
