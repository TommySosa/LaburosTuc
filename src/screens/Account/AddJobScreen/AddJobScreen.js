import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Icon, Input, Button } from "@rneui/themed";

export default function AddJobScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.contenedorImagen}>
          <Image
            style={styles.imagen}
            source={{
              uri: "https://www.lanacion.com.ar/resizer/v2/messi-recorrio-el-nuevo-campus-del-CMPRAEAQOZB4TJO3QV2Y47ZWZQ.jpg?auth=7966d4dae741243c0bf70e59f2894e847b9e1307eb3cf8b0de4dfd9d14de2a60&width=880&height=586&quality=70&smart=true",
            }}
          />
        </View>
        <View style={styles.waveGroup}>
          <Input placeholder="Descripcion" multiline={true} numberOfLines={3} />
          <Input placeholder="Cargo a cubrir" />
          <Input placeholder="Horarios" />
          <Input placeholder="Remuneracion" />

          <TouchableOpacity
            style={styles.ubication}
            onPress={() => props.navigation.navigate("Ubication")}
          >
            <View style={styles.contenedorUbication}>
              <Icon name="location-on" type="MaterialIcons" color="#474747" />
              <Text style={styles.textoUbication}>Agregar Ubicacion</Text>
            </View>
            <View style={styles.iconUbication}>
              <Icon name="chevron-right" type="MaterialIcons" color="#474747" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Publicar Empleo"
            buttonStyle={{
              backgroundColor: "#06E092",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
            }}
            containerStyle={{
              width: 450,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //   IMAGE
  contenedorImagen: {
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
  },
  imagen: {
    width: 350,
    height: 350,
  },
  //   UBICACION
  ubication: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 5,
    justifyContent: "space-between",
  },
  contenedorUbication: {
    flexWrap: "wrap",
    flexDirection: "row",
  },

  iconUbication: {
    alignSelf: "flex-end",
    marginTop: 3,
  },

  textoUbication: {
    color: "#474747",
    marginTop: 1,
    textAlign: "left",
    fontSize: 16,
  },
  // BOTON REACT NATIVE ELEMENTS
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
});
