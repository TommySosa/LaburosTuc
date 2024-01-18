import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from 'react-native-elements'
import { AccountStack } from "./AccountStack"
import { screen } from '../utils'
import { View } from "react-native";


const Tab = createBottomTabNavigator();

export function AppNavigation() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#00a680",
            tabBarInactiveTintColor: "#646464",
            tabBarIcon: ({ color, size }) =>
                screenOptions(route, color, size),
            tabBarStyle: { backgroundColor: "#06E092", height: 55 }
        })
        }>
            <Tab.Screen name={screen.jobs.tab} component={AccountStack}
                options={{ title: "Empleos" }} />
            <Tab.Screen name={screen.ranking.tab} component={AccountStack}
                options={{ title: "Ranking" }} />
            <Tab.Screen name={screen.search.tab} component={AccountStack}
                options={{ title: "" }} />
            <Tab.Screen name={screen.favorites.tab} component={AccountStack}
                options={{ title: "Favoritos" }} />
            <Tab.Screen name={screen.account.tab} component={AccountStack}
                options={{ title: "Cuenta" }} />
        </Tab.Navigator>
    )
}

function screenOptions(route, color, size) {
    let iconName;

    if (route.name === screen.jobs.tab) {
        iconName = "briefcase-search";
    }
    if (route.name === screen.favorites.tab) {
        iconName = "heart-outline"
    }
    if (route.name === screen.ranking.tab) {
        iconName = "star-outline"
    }
    if (route.name === screen.search.tab) {
        iconName = "plus-circle",
            size = 75;
    }
    if (route.name === screen.account.tab) {
        iconName = "account-tie"
    }

    return (
        <Icon type="material-community" name={iconName} color={color} size={size} containerStyle={iconName === "plus-circle" ? { position: "absolute" } : ""} />
    )
}