import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from './BtnFavorite.styles'
import { Icon } from 'react-native-elements'
import { doc, setDoc, getDocs, query, where, collection, deleteDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../../../utils"
import { forEach } from 'lodash'
import { generateRandomNumber } from "../../../utils/generateRandomNumber"

export function BtnFavoriteService({ id }) {
    const auth = getAuth()
    const [isFavorite, setIsFavorite] = useState(undefined)
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await getFavorites()
            setIsFavorite(response.length > 0)
        })()
    }, [id, isReload])

    const onReload = () => setIsReload(prev => !prev)

    const getFavorites = async () => {
        const q = query(
            collection(db, "favoritesServices"),
            where("id", "==", id),
            where("idUser", "==", auth.currentUser.uid)
        )

        const result = await getDocs(q)
        return result.docs
    }

    const addFavorite = async () => {
        try {
            const idFavorite = generateRandomNumber() + Date.now()
            const data = {
                idFavorite: idFavorite,
                id,
                idUser: auth.currentUser.uid
            }
            await setDoc(doc(db, "favoritesServices", idFavorite), data)
            setIsFavorite(true)
            onReload()
        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorite = async () => {
        try {
            const response = await getFavorites();
            if (response) {
                forEach(response, async (item) => {
                    await deleteDoc(doc(db, "favoritesServices", item.id));
                });
            }

            setIsFavorite(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.content}>
            {isFavorite !== undefined && (
                <Icon
                    type='material-community'
                    name={isFavorite ? "heart" : "heart-outline"}
                    color={isFavorite ? "#f00" : "#000"}
                    size={35}
                    onPress={isFavorite ? removeFavorite : addFavorite}
                />
            )}
        </View>
    )
}
