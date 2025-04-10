import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import AddJobScreen from "../screens/Job/AddJobScreen/AddJobScreen";
// import EditJobScreen from "../screens/Job/EditJobScreen/EditJobScreen";

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
        name={screen.jobs.editJob}
        component={EditJobScreen}
        options={{ title: "Editar" }}
      /> */}
    </Stack.Navigator>
  );
}
