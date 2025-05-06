import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Input, Text } from 'react-native-elements'
import { MultiSelect } from 'react-native-element-dropdown'
import { styles } from "./InfoForm.styles"
import { MapForm } from '../Shared/MapForm/MapForm'
import { useCategoryStore } from '../../stores/useCategoryStore'

export function InfoForm({ formik }) {
    const [showMap, setShowMap] = useState(false)
    const [address, setAddress] = useState('')
    const { categories, fetchCategories } = useCategoryStore()

    const isService = Array.isArray(formik.values.services)
    const selectedCategories = isService ? formik.values.services : (formik.values.category ? [formik.values.category] : [])

    const formattedCategories = useMemo(() => {
        return categories.map(c => ({ label: c, value: c }))
    }, [categories])

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleCategoryChange = (items) => {
        if (isService) {
            formik.setFieldValue("services", items)
        } else {
            // Solo se permite seleccionar una categoría para trabajos
            const firstCategory = Array.isArray(items) ? items[0] : items
            formik.setFieldValue("category", firstCategory)
        }
    }

    return (
        <>
            <View style={styles.content}>
                <Input
                    placeholder='Descripción'
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                    multiline
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
                    data={formattedCategories}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecciona el rubro"
                    searchPlaceholder="Buscar..."
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    selectedStyle={styles.selectedStyle}
                    maxSelect={isService ? undefined : 1}
                />

                {formik.errors.services && isService && (
                    <Text style={styles.error}>{formik.errors.services}</Text>
                )}

                <Input
                    placeholder='Horarios disponibles'
                    multiline
                    onChangeText={(text) => formik.setFieldValue("schedules", text)}
                    errorMessage={formik.errors.schedules}
                    placeholderTextColor="#bdbdbd"
                    style={{ marginTop: 30 }}
                    value={formik.values.schedules}
                />

                <Input
                    placeholder='Teléfono de contacto'
                    onChangeText={(text) => formik.setFieldValue("phone", text)}
                    errorMessage={formik.errors.phone}
                    placeholderTextColor="#bdbdbd"
                    value={formik.values.phone}
                />

                <Input
                    placeholder='Email de contacto'
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                    placeholderTextColor="#bdbdbd"
                    value={formik.values.email}
                />

                <Input
                    placeholder='Tu ubicación'
                    rightIcon={{
                        type: "material-community",
                        name: "map-marker-radius",
                        color: getColorIconMap(formik),
                        onPress: () => setShowMap(prev => !prev)
                    }}
                    disabled
                    multiline
                    errorMessage={formik.errors.address}
                    placeholderTextColor="gray"
                    value={formik.values.address}
                />
            </View>

            <MapForm show={showMap} close={() => setShowMap(false)} formik={formik} address={address} setAddress={setAddress} />
        </>
    )
}

const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#ff0000"
    if (formik.values.location) return "#00a680"
    return "#c2c2c2"
}
