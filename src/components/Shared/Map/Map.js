import React, { useEffect } from 'react'
import { MapView, Camera, PointAnnotation } from '@maplibre/maplibre-react-native'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Linking } from "react-native";

export function Map({ location, name }) {
    const openAppMap = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`
        Linking.openURL(url)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openAppMap} style={{ flex: 1 }}>
                <MapView
                    style={styles.map}
                    zoomEnabled={true}
                    onPress={openAppMap}
                    mapStyle={"https://api.maptiler.com/maps/openstreetmap/style.json?key=mCsk7t3U60xmbH8lW2fq"}
                >
                    <Camera
                        zoomLevel={15}
                        centerCoordinate={[location.longitude, location.latitude]}
                    />
                    <PointAnnotation
                        id="marker"
                        coordinate={[location.longitude, location.latitude]}
                    />
                </MapView>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 150,
    },
    map: {
        flex: 1
    }
})


// import React from 'react'
// import { styles } from './Map.styles'
// import MapView, { Marker } from 'react-native-maps'
// import OpenMap from "react-native-open-maps"

// export function Map({ location, name }) {

//     const openAppMap = () => {
//         OpenMap({
//             query: `${location.latitude},${location.longitude}`,
//             zoom: 19
//         })
//     }

//     return (
//         <MapView style={styles.content} initialRegion={location}
//             onPress={openAppMap}>
//             <Marker coordinate={location} />
//         </MapView>
//     )
// } CODIGO COMENTADO POR TEMA DE INCOMPATIBILIDAD POR API DE GOOGLE MAPS(NO BORRAR)