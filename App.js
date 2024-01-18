import { AppNavigation } from "./src/navigation/AppNavigation"
import { NavigationContainer } from "@react-navigation/native"
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}

