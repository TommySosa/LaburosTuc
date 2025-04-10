import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        marginHorizontal: 10,
    },
    dropdown: {
        marginHorizontal: 10,
        marginBottom: 5,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    placeholderStyle: {
        fontSize: 18,
        color: "#bdbdbd"
    },
    selectedStyle: {
        borderRadius: 12,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    error: {
        // marginBottom: 20,
        marginLeft: 12,
        color: "red",
        fontSize: 12
    }
})