import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // container: {
  //   justifyContent: "center",
  //   marginBottom: 5,

  // },
  // dropdown: {
  //   height: 50, // Reduce la altura del dropdown
  //   width: 100, // Reduce el ancho para que sea más pequeño
  //   borderColor: "#288DDD",
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   backgroundColor: "pink",

  // },
  // placeholderStyle: {
  //   fontSize: 14, // Reduce el tamaño del texto
  //   color: "#288DDD",
  //   marginLeft: 5,
  // },
  // selectedStyle: {
  //   borderRadius: 12,
  //   backgroundColor: "white",
  // },
  // selectedTextStyle: {
  //   fontSize: 14,
  //   color: "#288DDD",
  //   marginLeft: 5,
  // },
  // iconStyle: {
  //   width: 18,
  //   height: 18,
  // },
  dropdown: {
    marginHorizontal: 5,
    marginBottom: 5,
    marginTop: 5,
    height: 50,
    width: "90%"/*170*/,
    borderColor: "#288DDD",
    borderWidth: 1,
    borderRadius: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#288DDD",
    marginLeft: 10,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: "white",
    marginLeft: 15,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#288DDD",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  error: {
    // marginBottom: 20,
    marginLeft: 5,
    color: "red",
    fontSize: 12,
  },
});
