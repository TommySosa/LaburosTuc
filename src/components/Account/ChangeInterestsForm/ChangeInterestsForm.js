import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { getAuth } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { styles } from './ChangeInterestsForm.styles'
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangeInterestsForm.data"
import { db } from "../../../utils/firebase"
import { doc, setDoc, where, query, collection, onSnapshot } from 'firebase/firestore'

export function ChangeInterestsForm({ onClose, onReload }) {
    const [userInfo, setUserInfo] = useState([])
    const currentUser = getAuth().currentUser

    useEffect(() => {
        const q = query(
            collection(db, "usersInfo"),
            where("idUser", "==", currentUser.uid)
        )
        onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                setUserInfo(snapshot.docs[0].data());
            }
        })
    }, [])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formValue) => {
            try {
                const newData = {
                    ...userInfo,
                    interests: formValue.interests
                }
                newData.idUser = currentUser.uid

                const myDb = doc(db, "usersInfo", newData.idUser)

                await setDoc(myDb, newData)

                onReload()
                onClose()
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar tus intereses"
                })
            }
        }
    })
    return (
        <View style={styles.content}>
            <Input placeholder='Escribe tus intereses'
                rightIcon={{ type: "material-community", name: "cards-playing-heart-multiple", color: "#c2c2c2" }}
                multiline
                onChangeText={(text) => formik.setFieldValue("interests", text)}
                value={formik.values.interests}
                inputStyle={styles.input}
                errorMessage={formik.errors.interests}
            />
            <Button title="Cambiar intereses"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}