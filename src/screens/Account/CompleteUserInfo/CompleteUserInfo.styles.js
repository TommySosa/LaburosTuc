import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        // alignItems: "stretch",
        justifyContent: "center",
        // marginTop: 15,
        marginLeft: 5,
    },
    input: {
        width: "100%",
        marginTop: 5,
    },
    icon: {
        color: "#c1c1c1"
    },
    btnContainer: {
        width: "25%",
        height: 36,
        marginLeft: 25,
        marginTop: 10
    },
    btn: {
        backgroundColor: "#06E092",
    },
    label: {
        marginTop: 10,
        marginLeft: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // marginBottom: 30
    },
    btnContainerSkip: {
        // color: "#000",
    },
    btnSkip: {
        backgroundColor: "transparent",
        color: "#000",
        justifyContent: "flex-end",
        marginRight: 10
    },
    btnSubmitContainer: {
        width: "100%",
        marginTop: 40,
        marginBottom: 40

    },
})