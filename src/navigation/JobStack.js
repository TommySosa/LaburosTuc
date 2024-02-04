import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "../screens/Account/AccountScreen";
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/Account/RegisterScreen/RegisterScreen";
import { SettingsScreen } from "../screens/Account/SettingsScreen/SettingsScreen";
import { screen } from "../utils";
import AddJobScreen from "../screens/Account/AddJobScreen/AddJobScreen";
import UbicationScreen from "../screens/Account/UbicationScreen/UbicationScreen";

const Stack = createNativeStackNavigator();

export function JobStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.jobs.jobs}
        component={AccountScreen}
        options={{ title: "Empleos" }}
      />
      <Stack.Screen
        name={screen.jobs.addJob}
        component={AddJobScreen}
        options={{ title: "Agregar empleo" }}
      />
      <Stack.Screen
        name={screen.jobs.ubication}
        component={UbicationScreen}
        options={{ title: "Ubicacion" }}
      />
    </Stack.Navigator>
  );
}
