import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height - 30,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    pdf: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
    closeButtonText: {
        color: 'blue',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: 'center',
    },
    downloadButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
        zIndex: 1,
    },
    downloadButtonText: {
        color: 'blue',
    },
});