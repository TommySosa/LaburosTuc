import React from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { styles } from './LoginForm.styles'
import { useState } from 'react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.data'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { screen } from "../../../utils"

export function LoginForm() {
    const [showPassword, setShowpassword] = useState(false)
    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                await signInWithEmailAndPassword(
                    auth,
                    formValue.email,
                    formValue.password
                );
                navigation.navigate(screen.account.account)
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Usuario o contraseña incorrectos"
                })
                console.log(error);
            }
        }
    })

    const handleHiddenPassword = () => setShowpassword((prev) => !prev)

    return (
        <View style={styles.content}>
            <Input placeholder='Correo electrónico'
                containerStyle={styles.input}
                rightIcon={<Icon type='material-community'
                    name="at"
                    iconStyle={styles.icon}
                />}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={<Icon type='material-community'
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={handleHiddenPassword}
                />}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />

            <Button title='Iniciar sesión'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}