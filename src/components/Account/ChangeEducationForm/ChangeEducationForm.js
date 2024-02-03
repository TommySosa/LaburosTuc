import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { getAuth } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { useFormik } from "formik"
import { initialValues, validationSchema } from "./ChangeEducationForm.data"
import { db } from "../../../utils/firebase"
import { doc, setDoc, where, query, collection, onSnapshot } from 'firebase/firestore'
import { styles } from "./ChangeEducationForm.styles"

export function ChangeEducationForm({ onClose, onReload }) {
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
        initialValues: {
            education: userInfo.education || '',
        },
        validationSchema: validationSchema(),
        onSubmit: async (formValue) => {
            try {
                const newData = {
                    ...userInfo,
                    education: formValue.education
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
                    text1: "Error al cambiar la educación"
                })
            }
        }
    })
    return (
        <View style={styles.content}>
            <Input placeholder='Escribe el nombre de la institución'
                rightIcon={{ type: "material-community", name: "school", color: "#c2c2c2" }}
                onChangeText={(text) => formik.setFieldValue("education", text)}
                value={formik.values.education}
                errorMessage={formik.errors.education}
            />
            <Button title="Cambiar educación"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}