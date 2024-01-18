import React from 'react'
import { styles } from './Map.styles'
import MapView, { Marker } from 'react-native-maps'
import OpenMap from "react-native-open-maps"

export function Map({ location, name }) {

    const openAppMap = () => {
        OpenMap({
            query: `${location.latitude},${location.longitude}`,
            zoom: 19
        })
    }

    return (
        <MapView style={styles.content} initialRegion={location}
            onPress={openAppMap}>
            <Marker coordinate={location} />
        </MapView>
    )
}