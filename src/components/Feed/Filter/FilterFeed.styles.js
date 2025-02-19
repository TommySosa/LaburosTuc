import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //Conteiner debe permanecer hasta solucionar conflicto con publicaciones
  conteiner: {
    // maxHeight: 150,
    marginBottom: 5,
  },
  dropdown: {
    marginHorizontal: 10,
    marginBottom: 2,
    marginTop: 15,
    height: 50,
    width: 170,
    borderColor: "#288DDD",
    borderWidth: 1,
    borderRadius: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#288DDD",
    marginLeft: 20,
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
    marginLeft: 12,
    color: "red",
    fontSize: 12,
  },
});
