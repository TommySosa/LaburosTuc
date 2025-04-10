import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native-elements';

export default function Avatar({ photoURL, onPress, width, height }) {
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            borderRadius: width / 2,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },
        image: {
            width: width,
            height: height,
            borderRadius: width / 2,
        },
        defaultAvatar: {
            width: width,
            height: height,
            borderRadius: width / 2,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    return (
        <View style={styles.container} >
            {photoURL && photoURL != "" ? (
                <Image source={{ uri: photoURL }} style={styles.image} onPress={onPress} />
            ) : (
                <View style={styles.defaultAvatar}>
                    <MaterialCommunityIcons name="account" size={width / 2} color="white" onPress={onPress} />
                </View>
            )}
        </View>
    );
};
