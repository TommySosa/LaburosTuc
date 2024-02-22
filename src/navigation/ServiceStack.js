import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import AddServiceScreen from "../screens/Service/AddServiceScreen/AddServiceScreen";

const Stack = createNativeStackNavigator();

export function ServiceStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.services.addService}
                component={AddServiceScreen}
                options={{ title: "Publicar servicio" }}
            />
        </Stack.Navigator>
    );
}
