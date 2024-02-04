import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { getAuth } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { styles } from './ChangeDescriptionForm.styles'
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangeDescriptionForm.data"
import { db } from "../../../utils/firebase"
import { doc, setDoc, where, query, collection, onSnapshot } from 'firebase/firestore'

export function ChangeDescriptionForm({ onClose, onReload }) {
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
                    description: formValue.description
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
                    text1: "Error al cambiar la descripción"
                })
            }
        }
    })

    return (
        <View style={styles.content}>
            <Input placeholder='Escribe algo sobre tí'
                rightIcon={{ type: "material-community", name: "badge-account-horizontal", color: "#c2c2c2" }}
                multiline
                onChangeText={(text) => formik.setFieldValue("description", text)}
                value={formik.values.description}
                inputStyle={styles.input}
                errorMessage={formik.errors.description}
            />
            <Button title="Cambiar descripción"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}