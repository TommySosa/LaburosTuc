import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Input, Button, Dialog, Text } from 'react-native-elements'
import { styles } from './ChangeEmailForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeEmailForm.data'
import { getAuth, verifyBeforeUpdateEmail, EmailAuthProvider, reauthenticateWithCredential, signOut } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { doc, where, query, collection, onSnapshot, runTransaction } from 'firebase/firestore'
import { db } from '../../../utils'

export function ChangeEmailForm(props) {
    const { onClose, onReload } = props
    const [showPassword, setShowPassword] = useState(false)
    const [userInfo, setUserInfo] = useState([])
    const currentUser = getAuth().currentUser
    const [showDialog, setShowDialog] = useState(false)

    const onShowPassowrd = () => setShowPassword((prev) => !prev)
    const closeDialogAndLogout = async () => {
        setShowDialog(false)
        const auth = getAuth()
        await signOut(auth)
    }

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
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser
                const credentials = EmailAuthProvider.credential(
                    currentUser.email,
                    formValue.password
                )
                reauthenticateWithCredential(currentUser, credentials)

                await runTransaction(db, async (transaction) => {
                    await verifyBeforeUpdateEmail(currentUser, formValue.email);

                    const newData = {
                        ...userInfo,
                        email: formValue.email
                    };
                    newData.idUser = currentUser.uid;

                    const myDb = doc(db, "usersInfo", newData.idUser);
                    transaction.set(myDb, newData);
                    setShowDialog(true)
                });

                onReload()
                // onClose()
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el email"
                })
            }
        }
    })

    return (
        <View style={styles.content}>
            <Text style={styles.inputAlert}>Se cerrará sesion luego de cambiar el email. Ten en cuenta de agregar un correo válido para aceptar la verificación para luego iniciar sesión con el nuevo email.</Text>
            <Input placeholder='Nuevo email'
                containerStyle={styles.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: onShowPassowrd
                }}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Button title='Cambiar email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
            <Dialog
                isVisible={showDialog}
                onBackdropPress={closeDialogAndLogout}
            >
                <Dialog.Title title="Correo de verificación enviado" />
                <Text>Haz click en el enlace para validar tu nuevo email. Chequea la carpeta de spam.</Text>
            </Dialog>
        </View>
    )
}