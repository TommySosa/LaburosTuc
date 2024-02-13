import React, { useState } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { styles } from "./InfoForm.styles"
import { MapForm } from '../MapForm/MapForm'

export function InfoForm({ formik }) {
    const [showMap, setShowMap] = useState(false)
    const onOpenCloseMap = () => {
        setShowMap(prev => !prev)
    }
    const [address, setAddress] = useState('');

    return (
        <>
            <View style={styles.content}>
                <Input placeholder='Descripción'
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                    multiline={true}
                    errorMessage={formik.errors.description}
                />
                <Input placeholder='Cargo a cubrir'
                    onChangeText={(text) => formik.setFieldValue("name", text)}
                    errorMessage={formik.errors.name}
                />
                <Input placeholder='Horarios'
                    multiline={true}
                    onChangeText={(text) => formik.setFieldValue("schedules", text)}
                    errorMessage={formik.errors.schedules}
                />
                <Input placeholder='Remuneración'
                    onChangeText={(text) => formik.setFieldValue("remuneration", text)}
                    errorMessage={formik.errors.remuneration}
                />

                <Input placeholder='Ubicación del lugar de trabajo'
                    rightIcon={{
                        type: "material-community",
                        name: "map-marker-radius",
                        color: getColorIconMap(formik),
                        onPress: onOpenCloseMap
                    }}
                    value={address}
                    disabled
                    multiline
                    errorMessage={formik.errors.address}
                />
            </View>
            <MapForm show={showMap} close={onOpenCloseMap} formik={formik} address={address} setAddress={setAddress} />
        </>
    )
}

const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#ff0000"

    if (formik.values.location) return "#00a680"

    return "#c2c2c2"
}