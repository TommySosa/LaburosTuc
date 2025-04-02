import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Text } from 'react-native-elements'
import { styles } from "./InfoForm.styles"
import { MapForm } from '../../Shared/MapForm/MapForm'
import { Dropdown } from 'react-native-element-dropdown'
import { data } from '../../../utils/ArrayServices'

export function InfoForm({ formik }) {
    const [showMap, setShowMap] = useState(false)
    const onOpenCloseMap = () => {
        setShowMap(prev => !prev)
    }
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState(null)

    return (
        <>
            <View style={styles.content}>
                <Input placeholder='Descripción'
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                    multiline={true}
                    value={formik.values.description}
                    errorMessage={formik.errors.description}
                    placeholderTextColor="#bdbdbd"
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona el rubro"
                    searchPlaceholder="Buscar..."
                    // value={category}
                    value={formik.values.category}
                    onChange={item => {
                        setCategory(item.value);
                        formik.setFieldValue("category", item.label);
                    }}
                    selectedStyle={styles.selectedStyle}
                />
                {formik.errors.category ? <Text style={styles.error}>{formik.errors.category}</Text> : null}
                <Input placeholder='Horarios'
                    multiline={true}
                    onChangeText={(text) => formik.setFieldValue("schedules", text)}
                    errorMessage={formik.errors.schedules}
                    style={{ marginTop: 30 }}
                    placeholderTextColor="#bdbdbd"
                    value={formik.values.schedules}
                />
                <Input placeholder='Teléfono de contacto'
                    onChangeText={(text) => formik.setFieldValue("phone", text)}
                    errorMessage={formik.errors.phone}
                    placeholderTextColor="#bdbdbd"
                    value={formik.values.phone}
                />
                <Input placeholder='Email de contacto'
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                    placeholderTextColor="#bdbdbd"
                    value={formik.values.email}
                />
                <Input placeholder='Remuneración'
                    onChangeText={(text) => formik.setFieldValue("remuneration", text)}
                    errorMessage={formik.errors.remuneration}
                    placeholderTextColor="#bdbdbd"
                    value={formik.values.remuneration && formik.values.remuneration.toString()}
                />

                <Input placeholder='Ubicación del lugar de trabajo'
                    rightIcon={{
                        type: "material-community",
                        name: "map-marker-radius",
                        color: getColorIconMap(formik),
                        onPress: onOpenCloseMap
                    }}
                    // value={address}
                    value={formik.values.address}
                    disabled
                    multiline
                    errorMessage={formik.errors.address}
                    placeholderTextColor="#bdbdbd"
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