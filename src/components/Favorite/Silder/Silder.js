import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Avatar from "../../Shared/Avatar/Avatar";
import { formatDate } from "../../../utils/formatDate";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

const { width: screenWidth } = Dimensions.get("window"); // Obtener ancho de pantalla
const CARD_WIDTH = screenWidth * 0.9; // Hacerlo un 90% del ancho de pantalla
const IMAGE_HEIGHT = CARD_WIDTH * 0.5; // Ajustar la altura proporcionalmente

const FavoriteSlider = ({ favoritePosts, screenName }) => {
  const navigation = useNavigation();

  const seeMore = (id, nameScreen) => {
    const screenToNavigate =
      nameScreen === "JobScreen"
        ? screen.feed.jobSeeMore
        : screen.feed.serviceSeeMore;
    if (!screenToNavigate) {
      console.error("Error: screen.feed.jobSeeMore o screen.feed.serviceSeeMore es undefined");
      return;
    }
    navigation.navigate(screenToNavigate, { id });
  };

  const seeProfile = (idUser) => {
    if (idUser) {
      console.log("ID USER =", idUser);
      navigation.navigate("seeProfile", { idUser });
    } else {
      console.error("No se pudo obtener el ID del usuario.");
    }
  };

  return (
    <View style={{ height: IMAGE_HEIGHT + 100, marginHorizontal: 10 }}>
      <FlatList
        data={favoritePosts}
        horizontal
        pagingEnabled
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={CARD_WIDTH + 10} // Ajuste para el espaciado entre tarjetas
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => seeMore(item.id, screenName)}>
            <View
              style={{
                width: CARD_WIDTH,
                alignItems: "center",
                padding: 0,
                backgroundColor: "#ddd",
                marginLeft: 5,
                borderRadius: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: CARD_WIDTH,
                  height: IMAGE_HEIGHT,
                  backgroundColor: "#111",
                  opacity: 0.5,
                  zIndex: 10,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  width: CARD_WIDTH,
                  height: 50,
                  zIndex: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                {item.user && (
                  <TouchableOpacity onPress={() => seeProfile(item.user.idUser)}>
                    <Avatar photoURL={item.user.photoURL} width={40} height={40} />
                  </TouchableOpacity>
                )}
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                    {item.user.email ? item.user.email : null}
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    {item.createdAt ? formatDate(item.createdAt) : "date"}
                  </Text>
                </View>
              </View>
              {item.images[0] ? (
                <Image
                  source={{ uri: item.images[0] }}
                  style={{
                    width: CARD_WIDTH,
                    height: IMAGE_HEIGHT,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: CARD_WIDTH,
                    height: IMAGE_HEIGHT,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              )}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginVertical: 5,
                  color: "#333",

                }}
              >
                {item.category ? item.category : item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default function Slider({ post, screenName }) {
  return <FavoriteSlider favoritePosts={post} screenName={screenName} />;
}
