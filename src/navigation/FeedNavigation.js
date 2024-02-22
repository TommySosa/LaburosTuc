import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AccountScreen } from '../screens/Account/AccountScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screen } from '../utils';

const TopTab = createMaterialTopTabNavigator();

export function FeedNavigation() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.notchArea} />
            <TopTab.Navigator
                screenOptions={() => ({
                    headerShown: false,
                    tabBarActiveTintColor: "#000",
                    tabBarInactiveTintColor: "#646464",
                    tabBarStyle: { backgroundColor: "#06E092", height: 55 },
                })}
            >
                <TopTab.Screen name={screen.jobs.jobs} component={Screen1} options={{ title: "Empleos" }} />
                <TopTab.Screen name="Screen2" component={Screen2} options={{ title: "Servicios" }} />
            </TopTab.Navigator>
        </SafeAreaView>
    );
}

function Screen1() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Screen 1</Text>
        </View>
    );
}

function Screen2() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Screen 2</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    notchArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        backgroundColor: '#06E092',
    },
})