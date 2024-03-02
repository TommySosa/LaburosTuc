import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { styles } from './CompleteUserInfo.styles'
import { Button, Icon, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './CompleteUserInfo.data'
import { doc, setDoc } from 'firebase/firestore'
import { ChangeCvForm } from '../../../components/Account/ChangeCvForm/ChangeCvForm'
import { getAuth } from 'firebase/auth'
import { Modal } from '../../../components'
import { db, screen } from '../../../utils'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

export function CompleteUserInfo() {
    const currentUser = getAuth().currentUser
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation()
    const [cvUrl, setCvUrl] = useState("")

    const skip = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Feed', params: { screen: screen.jobs.jobs } }]
        });
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formValue) => {
            try {
                const newData = {
                    availability: formValue.availability,
                    cv: cvUrl,
                    description: formValue.description,
                    education: formValue.education,
                    email: currentUser.email,
                    idUser: currentUser.uid,
                    phone: formValue.phone,
                }

                const myDb = doc(db, "usersInfo", newData.idUser)

                await setDoc(myDb, newData)

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Feed', params: { screen: screen.jobs.jobs } }]
                });
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al completar tu información"
                })
            }
        }
    })

    return (
        <ScrollView>
            <View style={styles.content}>
                <Button title="Omitir por ahora"
                    containerStyle={styles.btnContainerSkip}
                    buttonStyle={styles.btnSkip}
                    titleStyle={{ color: "#c1c1c1" }}
                    onPress={skip}
                />
                <Text style={styles.label}>Sobre mí</Text>
                <Input placeholder='Descríbete para que los empleadores puedan conocerte mejor'
                    containerStyle={styles.input}
                    multiline
                    rightIcon={<Icon type='material-community' name='badge-account-horizontal' iconStyle={styles.icon} />}
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                    errorMessage={formik.errors.description}
                />
                <Text style={styles.label}>Educación</Text>
                <Input placeholder='Indica tus estudios'
                    containerStyle={styles.input}
                    rightIcon={<Icon type='material-community' name='school' iconStyle={styles.icon} />}
                    onChangeText={(text) => formik.setFieldValue("education", text)}
                    errorMessage={formik.errors.education}
                />
                <Text style={styles.label}>Disponibilidad</Text>
                <Input placeholder='Indica tus horarios disponibles'
                    containerStyle={styles.input}
                    rightIcon={<Icon type='material-community' name='timer-sand' iconStyle={styles.icon} />}
                    onChangeText={(text) => formik.setFieldValue("availability", text)}
                    errorMessage={formik.errors.availability}
                />
                <Text style={styles.label}>Teléfono</Text>
                <Input placeholder='Indica tu número de contacto'
                    containerStyle={styles.input}
                    rightIcon={<Icon type='material-community' name='phone' iconStyle={styles.icon} />}
                    onChangeText={(text) => formik.setFieldValue("phone", text)}
                    errorMessage={formik.errors.phone}
                />
                <View style={styles.container}>
                    <Text style={styles.label}>Curriculum</Text>
                    <View style={styles.btnContainer}>
                        <Button
                            onPress={() => setShowModal(true)}
                            containerStyle={styles.btn}
                            buttonStyle={styles.btn}
                            icon={<Icon type='material-community' name='upload' iconStyle={{ color: "#fff" }} />}
                        />
                    </View>
                </View>
                {formik.errors.cv && (
                    <Text style={{ color: 'red', fontSize: 12, marginLeft: 15 }}>{formik.errors.cv}</Text>
                )}

                <Button
                    title="Guardar"
                    containerStyle={styles.btnSubmitContainer}
                    buttonStyle={styles.btn}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                />

                <Modal show={showModal} close={() => setShowModal((prev) => !prev)} >
                    <ChangeCvForm isBeforeRegister={false} setCvUrl={setCvUrl} />
                </Modal>

            </View>
        </ScrollView>
    )
}