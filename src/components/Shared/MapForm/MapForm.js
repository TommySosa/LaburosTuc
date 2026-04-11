import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Modal } from '../../Shared/Modal';
import Toast from 'react-native-toast-message';
import { styles } from './MapForm.styles';
import { Button } from 'react-native-elements';

export function MapForm({ show, close, formik, address, setAddress }) {
    const [searchQuery, setSearchQuery] = useState(address || '');
    const [suggestions, setSuggestions] = useState([]);

    const searchAddress = async (text) => {
        if (text.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${text}`,
                {
                    headers: {
                        'User-Agent': 'vhg-app/1.0 (tomas.facundo.sosa@gmail.com)',
                    },
                }
            );
            const data = await response.json();
            console.log("Direcciones encontradas:", data);
            setSuggestions(data);
        } catch (error) {
            console.error("Error buscando dirección:", error);
            Toast.show({
                type: "error",
                text1: "Error al buscar dirección",
            });
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.length >= 3) {
                searchAddress(searchQuery);
            } else {
                setSuggestions([]);
            }
        }, 500); // espera 500ms luego de escribir

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSelectSuggestion = (item) => {
        setSearchQuery(item.display_name);
        setAddress(item.display_name);
        formik.setFieldValue("address", item.display_name);
        formik.setFieldValue("location", {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
        });
        setSuggestions([]);
    };

    const handleSave = () => {
        if (!formik.values.address || !formik.values.location) {
            Toast.show({
                type: 'error',
                text1: 'Debes seleccionar una dirección válida',
            });
            return;
        }

        close();
    };

    return (
        <Modal show={show} close={close}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ padding: 20, flex: 1 }}>
                        <TextInput
                            placeholder="Buscar dirección..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={{
                                backgroundColor: 'white',
                                padding: 10,
                                borderRadius: 8,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                marginBottom: 10,
                            }}
                        />

                        {suggestions.length > 0 && (
                            <ScrollView style={{ maxHeight: 200 }}>
                                {suggestions.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleSelectSuggestion(item)}
                                        style={{ borderBottomWidth: 1, borderColor: '#eee' }}
                                    >
                                        <Text style={{ padding: 10 }}>{item.display_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}

                        <View style={styles.mapActions}>
                            <Button
                                title="Guardar dirección"
                                containerStyle={styles.btnMapContainer}
                                buttonStyle={styles.btnMap}
                                onPress={handleSave}
                            />
                            <Button
                                title="Cerrar"
                                containerStyle={styles.btnMapContainerCancel}
                                buttonStyle={styles.btnMapCancel}
                                onPress={close}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}


//Componente de forma que aparece el map view pero genera incompatibilidades, NO borrar
// import React, { useEffect, useState } from 'react';
// import { View, TextInput, ScrollView } from 'react-native';
// import { Modal } from "../../Shared/Modal";
// import * as Location from "expo-location";
// import Toast from 'react-native-toast-message';
// import MapView, { Marker, UrlTile } from 'react-native-maps';
// import { styles } from './MapForm.styles';
// import { Button } from 'react-native-elements';

// export function MapForm({ show, close, formik, address, setAddress }) {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [enableDraggable, setEnableDraggable] = useState(false);
//     const [location, setLocation] = useState({
//         latitude: 0.001,
//         longitude: 0.001,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//     });

//     useEffect(() => {
//         (async () => {
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== "granted") {
//                 Toast.show({
//                     type: "error",
//                     position: "top",
//                     text1: "Permiso denegado para acceder a la ubicación.",
//                 });
//                 return;
//             }

//             const locationTemp = await Location.getCurrentPositionAsync({});
//             setLocation({
//                 latitude: locationTemp.coords.latitude,
//                 longitude: locationTemp.coords.longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//             });

//             fetchAddress(locationTemp.coords.latitude, locationTemp.coords.longitude);
//         })();
//     }, []);

//     const fetchAddress = async (lat, lon) => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//             );
//             const data = await response.json();
//             if (data.display_name) {
//                 setAddress(data.display_name);
//                 formik.setFieldValue("address", data.display_name);
//             }
//         } catch (error) {
//             console.error("Error obteniendo la dirección:", error);
//         }
//     };

//     const searchAddress = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();

//             if (data.length > 0) {
//                 const { lat, lon } = data[0];
//                 setLocation({
//                     latitude: parseFloat(lat),
//                     longitude: parseFloat(lon),
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01,
//                 });

//                 setAddress(data[0].display_name);
//                 formik.setFieldValue("address", data[0].display_name);
//             } else {
//                 Toast.show({
//                     type: "error",
//                     position: "bottom",
//                     text1: "No se encontró la dirección.",
//                 });
//             }
//         } catch (error) {
//             console.error("Error buscando dirección:", error);
//         }
//     };

//     const handleMarkerDragEnd = async (event) => {
//         const { latitude, longitude } = event.nativeEvent.coordinate;
//         setLocation({
//             latitude,
//             longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//         });

//         fetchAddress(latitude, longitude);
//     };

//     const saveLocation = () => {
//         formik.setFieldValue("location", location);
//         formik.setFieldValue("address", address);
//         close();
//     };

//     return (
//         <Modal show={show} close={close}>
//             <ScrollView>
//                 <View style={styles.searchContainer}>
//                     <TextInput
//                         placeholder='Buscar dirección...'
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                         onSubmitEditing={searchAddress}
//                     />
//                 </View>

//                 <MapView
//                     initialRegion={location}
//                     showsUserLocation={true}
//                     style={styles.mapStyle}
//                 >
//                     {/* OpenStreetMap Tile Layer */}
//                     <UrlTile
//                         urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         maximumZ={19}
//                     />

//                     <Marker
//                         draggable={enableDraggable}
//                         coordinate={location}
//                         onDragEnd={handleMarkerDragEnd}
//                     />
//                 </MapView>

//                 <View style={styles.editContainer}>
//                     <Button
//                         title="Arrastrar"
//                         containerStyle={styles.btnEditContainer}
//                         buttonStyle={styles.btnEdit}
//                         onPress={() => setEnableDraggable(!enableDraggable)}
//                     />
//                 </View>

//                 <View style={styles.mapActions}>
//                     <Toast />

//                     <Button
//                         title='Guardar'
//                         containerStyle={styles.btnMapContainerSave}
//                         buttonStyle={styles.btnMapSave}
//                         onPress={saveLocation}
//                     />
//                     <Button
//                         title='Cerrar'
//                         containerStyle={styles.btnMapContainerCancel}
//                         buttonStyle={styles.btnMapCancel}
//                         onPress={close}
//                     />
//                 </View>
//             </ScrollView>
//         </Modal>
//     );
// }
