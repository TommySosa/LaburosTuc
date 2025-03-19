import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import Avatar from "../../Shared/Avatar/Avatar";
import { formatDate } from "../../../utils/formatDate";
import { BtnFavoriteJob } from "../../Shared/BtnFavorite/BtnFavoriteJob";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { screen } from "../../../utils";
const FavoriteSlider = ({ favoritePosts, screenName }) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  // const [screenNm, setScreenNm] = useState(screenName);
  //Ver detalles del posteo
  const seeMore = (id, nameScreen) => {
    const screenToNavigate =
      nameScreen === "JobScreen"
        ? screen.feed.jobSeeMore
        : screen.feed.serviceSeeMore;

    if (!screenToNavigate) {
      console.error(
        "Error: screen.feed.jobSeeMore o screen.feed.serviceSeeMore es undefined"
      );
      return;
    }

    navigation.navigate(screenToNavigate, { id });
  };
  //Ver perfil
  const seeProfile = (idUser) => {
    if (idUser) {
      console.log("ID USER =", idUser);
      navigation.navigate("seeProfile", { idUser });
    } else {
      console.error("No se pudo obtener el ID del usuario.");
    }
  };

  return (
    <View style={{ height: 250, marginRight: 5 }}>
      <FlatList
        data={favoritePosts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={400}
        // decelerationRate="fast"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => seeMore(item.id, screenName)}>
            <View
              style={{
                width: 400,
                // justifyContent: "center",
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
                  width: 400,
                  height: 200,
                  backgroundColor: "#111",
                  opacity: 0.5, //
                  zIndex: 10,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  width: 400,
                  height: 50,
                  zIndex: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      margin: 5,
                    }}
                  >
                    {item.user && (
                      <TouchableOpacity
                        onPress={() => seeProfile(item.user.idUser)}
                      >
                        <Avatar
                          photoURL={item.user.photoURL}
                          width={40}
                          height={40}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {item.user.email ? item.user.email : "user"}
                    </Text>
                    <Text style={{ color: "#fff" }}>
                      {item.createdAt ? formatDate(item.createdAt) : "date"}
                    </Text>
                  </View>
                </View>
                <BtnFavoriteJob id={item.id} />
              </View>
              {item.images[0] ? (
                <Image
                  source={{ uri: item.images[0] }}
                  style={{
                    width: 400,
                    height: 200,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 400,
                    height: 200,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,

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
                  marginTop: 10,

                  color: "#333",
                }}
              >
                {item.category ? item.category : item.description}
              </Text>
              {/* <Text>{item.description}</Text> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Uso del componente
export default function Slider({ post, screenName }) {
  return <FavoriteSlider favoritePosts={post} screenName={screenName} />;
}
