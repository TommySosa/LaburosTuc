import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        height: 550
    },
    mapActions: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    btnMapContainerSave: {
        paddingRight: 5,
        width: "50%",
    },
    btnMapSave: {
        backgroundColor: "#00a680"
    },
    btnMapContainerCancel: {
        paddingLeft: 5,
        width: "50%"
    },
    btnMapCancel: {
        backgroundColor: "#a60d0d"
    },
    searchContainer: {
        padding: 10
    },
    btnEditContainer: {
        paddingRight: 5,
    },
    btnEdit: {
        backgroundColor: "#00a680",
        right: 0,
        bottom: 0,
        zIndex: 500
    },
    editContainer: {
        position: 'absolute',
        top: 55,
        left: 20,
        zIndex: 10,
    }
})