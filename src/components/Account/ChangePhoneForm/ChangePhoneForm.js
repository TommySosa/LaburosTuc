import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { getAuth } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { styles } from './ChangePhoneForm.styles'
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangePhoneForm.data"
import { db } from "../../../utils/firebase"
import { doc, setDoc, where, query, collection, onSnapshot } from 'firebase/firestore'

export function ChangePhoneForm({ onClose, onReload }) {
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
                    phone: formValue.phone
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
                    text1: "Error al cambiar tu teléfono"
                })
            }
        }
    })
    return (
        <View style={styles.content}>
            <Input placeholder='Escribe tu número de teléfono'
                rightIcon={{ type: "material-community", name: "phone", color: "#c2c2c2" }}
                multiline
                onChangeText={(text) => formik.setFieldValue("phone", text)}
                value={formik.values.phone}
                inputStyle={styles.input}
                errorMessage={formik.errors.phone}
            />
            <Button title="Cambiar número"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}