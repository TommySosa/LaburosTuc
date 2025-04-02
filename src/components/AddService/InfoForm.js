import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Text } from 'react-native-elements'
import { styles } from "./InfoForm.styles"
import { MapForm } from '../Shared/MapForm/MapForm'
import { MultiSelect } from 'react-native-element-dropdown'
import { data } from '../../utils/ArrayServices'

export function InfoForm({ formik }) {
    const [showMap, setShowMap] = useState(false)
    const onOpenCloseMap = () => {
        setShowMap(prev => !prev)
    }
    const [address, setAddress] = useState('');
    const [categories, setCategories] = useState([])

    return (
        <>
            <View style={styles.content}>
                <Input placeholder='Descripción'
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                    multiline={true}
                    errorMessage={formik.errors.description}
                    placeholderTextColor="#bdbdbd"
                    value={formik.values.description}
                />
                <MultiSelect
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
                    // value={categories}
                    value={formik.values.services}
                    onChange={items => {
                        console.log(items);
                        setCategories(items);
                        formik.setFieldValue("services", items);
                        console.log(categories);
                    }}
                    selectedStyle={styles.selectedStyle}
                />
                {formik.errors.services ? <Text style={styles.error}>{formik.errors.services}</Text> : null}
                <Input placeholder='Horarios disponibles'
                    multiline={true}
                    onChangeText={(text) => formik.setFieldValue("schedules", text)}
                    errorMessage={formik.errors.schedules}
                    placeholderTextColor="#bdbdbd"
                    style={{ marginTop: 30 }}
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
                <Input placeholder='Tu ubicación'
                    rightIcon={{
                        type: "material-community",
                        name: "map-marker-radius",
                        color: getColorIconMap(formik),
                        onPress: onOpenCloseMap
                    }}
                    // value={address}
                    disabled
                    multiline
                    errorMessage={formik.errors.address}
                    placeholderTextColor="gray"
                    value={formik.values.address}
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

