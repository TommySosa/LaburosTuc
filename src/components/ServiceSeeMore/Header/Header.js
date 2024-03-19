import React from 'react'
import { View } from 'react-native'
import { Text, Rating } from 'react-native-elements'
import { styles } from './Header.styles'

export function Header({ service }) {

    return (
        <View style={styles.content}>
            <View style={styles.titleView}>
                <Text style={styles.name}>{service.category}</Text>
                {/* <Rating imageSize={20} readonly startingValue={restaurant.ratingMedia | 0} /> */}
            </View>
            <Text style={styles.description}>{service.description}</Text>
        </View>
    )
}