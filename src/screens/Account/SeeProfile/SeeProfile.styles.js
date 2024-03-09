import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    btnStyles: {
        marginTop: 30,
        paddingVertical: 15,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#c2c2c2",
        borderBottomWidth: 1,
        borderBottomColor: "#c2c2c2",
        marginBottom: 30
    },
    btnTextStyle: {
        color: "#06E092"
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    btnSettings: {
        paddingVertical: 15,
        backgroundColor: "#06E092",
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "auto"
    },
    btnSettingsText: {
        color: "#fff",
        textAlign: "center",
    },
    btnCv: {
        backgroundColor: "#06E092",
        paddingVertical: 15,
        width: 250,
        marginBottom: 15,
        borderRadius: 8
    },
    btnTextCv: {
        fontWeight: "bold"
    },
    editButton: {
        position: 'relative',
        marginRight: 10,
    },
    circle: {
        position: 'absolute',
        backgroundColor: '#ccc',
        width: 25,
        height: 25,
        borderRadius: 100,
        bottom: -25,
        right: -10,
    },
    inputMessage: {
        // fontWeight: "600",
        fontStyle: "italic"
    }
})