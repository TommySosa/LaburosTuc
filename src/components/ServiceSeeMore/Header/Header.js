import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Header.styles";
import { ServiceList } from "../ServiceList/ServiceList";

export function Header({ service }) {
  const { services } = service;
  return (
    <View style={styles.content}>
      {services && <ServiceList services={services} />}

      <Text style={styles.description}>{service.description}</Text>
    </View>
  );
}
