import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    overlay: {
        height: "auto",
        width: "90%",
        backgroundColor: "#fff",
        /*Nuevo - ini prueba*/
        maxHeight: "90%",        // 🔥 Permite scroll y visibilidad con teclado
        minHeight: 200,           // Evita que sea demasiado chico
        borderRadius: 10,
        padding: 10,
        /*Nuevo - fin prueba*/
    }
})