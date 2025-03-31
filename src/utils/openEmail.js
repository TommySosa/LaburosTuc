import { Linking } from "react-native";

export const openEmail = (email, categories) => {
    if (email) {
        const subject = encodeURIComponent("Consulta sobre tu anuncio en Laburos Tuc.");
        const body = encodeURIComponent(`Hola, estoy interesado en tu anuncio sobre ${categories} que encontré en Laburos Tuc.`);
        const url = `mailto:${email}?subject=${subject}&body=${body}`;
        Linking.openURL(url).catch(err => console.error("Error al abrir el correo:", err));
    }
};