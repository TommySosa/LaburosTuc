import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAxrKC610Yn2mvRu5jqdHtpFmoxtfnP1T8",
    authDomain: "laburostuc.firebaseapp.com",
    projectId: "laburostuc",
    storageBucket: "laburostuc.appspot.com",
    messagingSenderId: "6218365606",
    appId: "1:6218365606:web:6fcac18d8b627e3aed5267"
};

export const initFirebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(initFirebase, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = initializeFirestore(initFirebase, {
    experimentalForceLongPolling: true, // Soluciona problemas con WebSockets en React Native
    useFetchStreams: false, // Opcional, reduce problemas con conexiones
});
// export const db = getFirestore(initFirebase)