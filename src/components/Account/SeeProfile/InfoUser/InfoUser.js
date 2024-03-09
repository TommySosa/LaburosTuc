import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { styles } from './InfoUser.styles'
import Avatar from '../../../Shared/Avatar/Avatar'

export function InfoUser({ userInfo }) {

    return (
        <View style={styles.content}>
            <Avatar photoURL={userInfo ? userInfo.photoURL : null} width={75} height={75} />

            <View>
                <Text style={styles.displayName}>{userInfo ? userInfo.displayName : null}</Text>
                <Text style={{ marginLeft: 10 }}>{userInfo ? userInfo.email : null}</Text>
            </View>
        </View>
    )
}