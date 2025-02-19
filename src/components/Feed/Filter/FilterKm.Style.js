import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  conteiner: {
    position: "absolute",
    marginLeft: 200,
  },
  dropdown: {
    marginHorizontal: 10,
    marginBottom: 2,
    marginTop: 15,
    height: 50,
    width: 142,
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
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "#288DDD",
    marginLeft: 10,
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
