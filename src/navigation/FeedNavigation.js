import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screen } from '../utils';
import JobScreen from '../screens/Feed/Job/JobScreen';
import ServiceScreen from '../screens/Feed/Service/ServiceScreen'

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
                <TopTab.Screen name={screen.jobs.jobs} component={JobScreen} options={{ title: "Empleos" }} />
                <TopTab.Screen name={screen.services.services} component={ServiceScreen} options={{ title: "Servicios" }} />
            </TopTab.Navigator>
        </SafeAreaView>
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