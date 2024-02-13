import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import AddJobScreen from "../screens/Job/AddJobScreen/AddJobScreen";

const Stack = createNativeStackNavigator();

export function JobStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.jobs.addJob}
        component={AddJobScreen}
        options={{ title: "Publicar empleo" }}
      />
      {/* <Stack.Screen
        name={screen.jobs.addJob}
        component={AddJobScreen}
        options={{ title: "Agregar empleo" }}
      /> */}
      {/* <Stack.Screen
        name={screen.jobs.ubication}
        component={UbicationScreen}
        options={{ title: "Ubicacion" }}
      /> */}
    </Stack.Navigator>
  );
}
