import React, { useEffect, useState } from 'react'
import { View, TextInput, ScrollView } from 'react-native'
import { Modal } from "../../Shared/Modal"
import * as Location from "expo-location"
import Toast from 'react-native-toast-message'
import MapView, { Marker } from 'react-native-maps'
import { styles } from './MapForm.styles'
import { Button } from 'react-native-elements'
import Geocoding from 'react-native-geocoding';

export function MapForm({ show, close, formik, address, setAddress }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [enableDraggable, setEnableDraggable] = useState(false)

    const [location, setLocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })
    useEffect(() => {
        Geocoding.init("AIzaSyAU1omvVT_M8pnDPqxsus1Y3PUQQ5RmWv4");
    }, []);

    const searchAddress = async () => {
        try {
            const response = await Geocoding.from(searchQuery);
            const { lat, lng } = response.results[0].geometry.location;
            setLocation({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            const addressResponse = await Geocoding.from(lat, lng);
            const formattedAddress = addressResponse.results[0].formatted_address;
            setAddress(formattedAddress);
        } catch (error) {
            if (error.code === 4) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "No se encontró la dirección que buscas."
                })
            }
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status != "granted") {
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: "No se encontró la dirección que buscas.",
                })
                return
            }

            const locationTemp = await Location.getCurrentPositionAsync({})

            setLocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })
            const addressResponse = await Geocoding.from(locationTemp.coords.latitude, locationTemp.coords.longitude);
            const formattedAddress = addressResponse.results[0].formatted_address;
            setAddress(formattedAddress);
            formik.setFieldValue("location", {
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })
            formik.setFieldValue("address", formattedAddress)
        })()
    }, [])

    const saveLocation = () => {
        formik.setFieldValue("location", location)
        formik.setFieldValue("address", address)
        close()
    }

    const handleMarkerDragEnd = async (event) => {
        setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        const addressResponse = await Geocoding.from(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude);
        const formattedAddress = addressResponse.results[0].formatted_address;
        setAddress(formattedAddress);
    }

    return (
        <>
            <Modal show={show} close={close}>

                <ScrollView>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder='Buscar dirección...'
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={searchAddress}
                        />
                    </View>
                    <MapView

                        initialRegion={location}
                        showsUserLocation={true}
                        style={styles.mapStyle}
                    // onRegionChange={(locationTemp) => setLocation(locationTemp)}
                    >

                        <Marker
                            draggable={enableDraggable}
                            coordinate={location}
                            onDragEnd={handleMarkerDragEnd}
                        />
                    </MapView>
                    <View style={styles.editContainer}>
                        <Button title="Arrastrar" containerStyle={styles.btnEditContainer}
                            buttonStyle={styles.btnEdit}
                            onPress={() => setEnableDraggable(!enableDraggable)} />
                    </View>

                    <View style={styles.mapActions}>
                        <Toast />

                        <Button title='Guardar'
                            containerStyle={styles.btnMapContainerSave}
                            buttonStyle={styles.btnMapSave}
                            onPress={saveLocation}
                        />
                        <Button title='Cerrar'
                            containerStyle={styles.btnMapContainerCancel}
                            buttonStyle={styles.btnMapCancel}
                            onPress={close}
                        />
                    </View>
                </ScrollView>
            </Modal>
        </>
    )
}