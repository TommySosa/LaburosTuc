import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    margin: 15,
  },
  titleView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1, //no desborde,
    color: "#333",
    lineHeight: 26,
  },
  description: {
    marginTop: 5,
    color: "#828282",
  },
});
