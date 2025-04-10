import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../utils";

export const getCategories = async () => {
    try {
        const categoriesQuery = query(collection(db, "categories"), orderBy("label"));
        const snapshot = await getDocs(categoriesQuery, { source: "cache" });
        let categories = [];

        if (!snapshot.empty) {
            categories = snapshot.docs.map((doc) => doc.data().label);
            console.log("Categorías cargadas desde caché. ");
            return categories;
        } else {
            return new Promise((resolve) => {
                const unsubscribe = onSnapshot(categoriesQuery, (snapshot) => {
                    const updatedCategories = snapshot.docs.map((doc) => doc.data().label);
                    console.log("Categorías actualizadas en tiempo real desde Firestore. ");
                    resolve(updatedCategories);
                });
                return () => unsubscribe();
            });
        }

    } catch (error) {
        console.error("Error al cargar categorías:", error);
        return [];
    }
};