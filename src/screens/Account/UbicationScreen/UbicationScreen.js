import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SearchBar, Button } from "@rneui/themed";

export default function UbicationScreen(props) {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <View style={styles.contenedor}>
      <View style={styles.card}>
        <View style={styles.searchContenedor}>
          <SearchBar
            style={styles.search}
            ref={(search) => (this.search = search)}
            placeholder="Busca tu ciudad..."
            onChangeText={updateSearch}
            value={search}
          />
        </View>

        <View style={styles.textContenedor}>
          <Text style={styles.text}>
            Podes buscar tu ciudad o elegir la ubicacion exacta en el mapa.
          </Text>
        </View>

        <View style={styles.mapContenedor}>
          <Text style={styles.map}>MAPA</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            containerStyle={{
              width: 120,
              marginVertical: 10,
              alignItems: "flex-start",
            }}
            title="Cancelar"
            type="clear"
            titleStyle={{ color: "red" }}
          />
          <Button
            containerStyle={{
              width: 120,
              marginVertical: 10,
              alignItems: "flex-end",
            }}
            title="Confirmar"
            type="clear"
            titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
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
  //  SEARCH
  searchContenedor: {
    marginBottom: 50,
  },
  //  TEXTO
  text: {
    fontSize: 17,
    color: "#5A5A5A",
  },
  //   MAP
  mapContenedor: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
    marginTop: 10,
  },
  map: { width: 350, height: 350 },

  // BOTON REACT NATIVE ELEMENTS
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  buttonCnfirmar: {},
});
