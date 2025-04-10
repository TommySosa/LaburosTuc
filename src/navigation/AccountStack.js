import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "../screens/Account/AccountScreen";
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/Account/RegisterScreen/RegisterScreen";
import { screen } from "../utils";
import { CompleteUserInfo } from "../screens/Account/CompleteUserInfo/CompleteUserInfo";
import { SeeProfile } from "../screens/Account/SeeProfile/SeeProfile";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{ title: "Perfil" }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{ title: "Iniciar sesión" }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={RegisterScreen}
        options={{ title: "Crea tu cuenta" }}
      />
      <Stack.Screen
        name={screen.account.completeUserInfo}
        component={CompleteUserInfo}
        options={{ title: "Completá tu información" }}
      />
      {/* <Stack.Screen
        name={screen.account.seeProfile}
        component={SeeProfile}
        options={{ title: "Perfil de:" }}
      /> */}
    </Stack.Navigator>
  );
}
