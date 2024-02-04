import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const AnimatedButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const translateY = new Animated.Value(0);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    Animated.timing(translateY, {
      toValue: showOptions ? 0 : -150,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.buttonText}>Empleo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.buttonText}>Servicio</Text>
          </TouchableOpacity>
        </View>
      )}

      <Animated.View
        style={[styles.mainButton, { transform: [{ translateY: translateY }] }]}
      >
        <TouchableOpacity onPress={toggleOptions}>
          {/* <Text style={styles.buttonText}>
            {showOptions ? "Ocultar opciones" : "Mostrar opciones"}
          </Text> */}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mainButton: {
    overflow: "hidden",
    borderRadius: 100,
  },
  touchableArea: {
    padding: 10,
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionButton: {
    padding: 8,
    backgroundColor: "#2ecc71",
    borderRadius: 100,
    marginRight: 50,
    marginLeft: 50,
  },
});

export default AnimatedButton;
