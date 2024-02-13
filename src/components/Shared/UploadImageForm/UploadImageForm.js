import React, { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Icon, Avatar, Text } from 'react-native-elements'
import { styles } from "./UploadImageForm.styles"
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { LoadingModal } from "../../Shared/LoadingModal/LoadingModal"
import { filter, map } from 'lodash'
import { generateRandomNumber } from '../../../utils/generateRandomNumber'

export function UploadImageForm({ formik }) {
    const [isLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.7,
        })

        if (!result.canceled) {
            setIsLoading(true)
            uploadImage(result.assets[0].uri)
        }
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()

        const storage = getStorage()
        const storageRef = ref(storage, `jobs/${generateRandomNumber()}`)

        uploadBytes(storageRef, blob).then((snapshot) => {
            updatePhotosRestaurant(snapshot.metadata.fullPath)
        })
    }

    const updatePhotosRestaurant = async (imagePath) => {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)

        const imageUrl = await getDownloadURL(imageRef)

        formik.setFieldValue("images", [...formik.values.images, imageUrl])
        setIsLoading(false)
    }

    const removeImage = (img) => {
        Alert.alert(
            "Eliminar imágen",
            "Estás seguro de eliminar esta imágen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        const result = filter(formik.values.images, (image) => image !== img)
                        formik.setFieldValue("images", result)
                    }
                }
            ], { cancelable: false }
        )
    }

    return (
        <>
            <ScrollView style={styles.viewImage} horizontal showsHorizontalScrollIndicator={true}>
                <Icon type='material-community'
                    name='camera'
                    color="#a7a7a7"
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}
                />
                {map(formik.values.images, (image) => (
                    <Avatar key={image}
                        source={{ uri: image }}
                        containerStyle={styles.imageStyle}
                        onPress={() => removeImage(image)}
                    />
                ))}
            </ScrollView>

            <Text style={styles.errors}>{formik.errors.images}</Text>

            <LoadingModal show={isLoading} text="Subiendo imágen" />
        </>
    )
}