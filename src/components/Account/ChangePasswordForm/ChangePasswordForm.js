import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { styles } from "./ChangePasswordForm.styles"
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangePasswordForm.data'
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import Toast from 'react-native-toast-message'

export function ChangePasswordForm({ onClose }) {
    const [showPassword, setShowPassword] = useState(false)

    const onShowPassword = () => setShowPassword(prev => !prev)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser

                const credentials = EmailAuthProvider.credential(
                    currentUser.email,
                    formValue.password
                )

                reauthenticateWithCredential(currentUser, credentials)

                await updatePassword(currentUser, formValue.newPassword)

                onClose()
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar la contraseña"
                })
            }
        }
    })
    return (
        <View style={styles.content}>
            <Input placeholder='Contraseña actual'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    {
                        type: "material-community",
                        name: showPassword ? "eye-off-outline" : "eye-outline",
                        color: "#c2c2c2",
                        onPress: onShowPassword
                    }
                }
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Input placeholder='Nueva contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    {
                        type: "material-community",
                        name: showPassword ? "eye-off-outline" : "eye-outline",
                        color: "#c2c2c2",
                        onPress: onShowPassword
                    }
                }
                onChangeText={(text) => formik.setFieldValue("newPassword", text)}
                errorMessage={formik.errors.newPassword}
            />
            <Input placeholder='Repite nueva contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    {
                        type: "material-community",
                        name: showPassword ? "eye-off-outline" : "eye-outline",
                        color: "#c2c2c2",
                        onPress: onShowPassword
                    }
                }
                onChangeText={(text) => formik.setFieldValue("confirmNewPassword", text)}
                errorMessage={formik.errors.confirmNewPassword}
            />
            <Button title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}