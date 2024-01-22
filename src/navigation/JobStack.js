import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AccountScreen } from "../screens/Account/AccountScreen"
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen"
import { RegisterScreen } from "../screens/Account/RegisterScreen/RegisterScreen"
import { SettingsScreen } from "../screens/Account/SettingsScreen/SettingsScreen"
import { screen } from "../utils"

const Stack = createNativeStackNavigator()

export function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.jobs.jobs}
                component={AccountScreen}
                options={{ title: "Empleos" }}
            />
            <Stack.Screen name={screen.jobs.addJob}
                component={LoginScreen}
                options={{ title: "Agregar empleo" }}
            />
        </Stack.Navigator>
    )
}