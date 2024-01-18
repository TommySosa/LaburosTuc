import React from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { styles } from './RegisterForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.data'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigation } from "@react-navigation/native"
import Toast from 'react-native-toast-message'
import { screen } from '../../../utils'

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                await createUserWithEmailAndPassword(
                    auth,
                    formValue.email,
                    formValue.password
                )
                navigation.navigate(screen.account.account)
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al registrarse, inténtelo más tarde"
                })
                console.log(error);
            }
        }
    })

    const showHiddenPassword = () => setShowPassword((prevState) => !prevState)

    return (
        <View style={styles.content}>
            <Input placeholder='Correo electrónico'
                containerStyle={styles.input}
                rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={<Icon type='material-community'
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={showHiddenPassword} />}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Input placeholder='Confirmar contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={<Icon type='material-community'
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={showHiddenPassword} />}
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                errorMessage={formik.errors.repeatPassword}
            />
            <Button title={"Unirse"}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn} onPress={formik.handleSubmit}
                loading={formik.isSubmitting} />
        </View>
    )
}