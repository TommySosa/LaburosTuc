import { Linking } from "react-native";

export const openWhatsApp = (phone, categories) => {
    if (phone) {
        const message = encodeURIComponent(`Hola, estoy interesado en tu anuncio sobre ${categories} que encontré en Laburos Tuc.`);
        const url = `https://wa.me/+54${phone}?text=${message}`;
        Linking.openURL(url).catch(err => console.error("Error al abrir WhatsApp:", err));
    }
};