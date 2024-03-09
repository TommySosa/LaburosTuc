import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Text } from "react-native-elements";
import { AccountStack } from "./AccountStack";
import { screen } from "../utils";
import { JobStack } from "./JobStack";
import { useNavigation } from "@react-navigation/native";
import { ServiceStack } from "./ServiceStack";
import { FeedNavigation } from "./FeedNavigation";
import { JobSeeMoreScreen } from "../screens/Feed/JobSeeMore/JobSeeMoreScreen";
import { SeeProfile } from "../screens/Account/SeeProfile/SeeProfile";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  const [showFAB, setShowFAB] = useState(false);
  const navigation = useNavigation()

  function screenOptions(route, color, size) {
    let iconName;

    if (route.name === screen.feed.tab) {
      iconName = "briefcase-search";
    }
    if (route.name === screen.favorites.tab) {
      iconName = "heart-outline";
    }
    if (route.name === screen.ranking.tab) {
      iconName = "star-outline";
    }
    if (route.name === screen.jobs.tab) {
      (iconName = "plus-circle"), (size = 75);
    }
    if (route.name === screen.account.tab) {
      iconName = "account-tie";
    }
    if (route.name === screen.services.tab) {
      console.log("AQUI");
      return null
    }

    return (
      <>
        {
          iconName === "plus-circle" ?
            <Icon
              type="material-community"
              name="plus-circle"
              color={color}
              size={size}
              containerStyle={{ position: "absolute" }}
              onPress={() => setShowFAB(!showFAB)}
            />
            : <Icon
              type="material-community"
              name={iconName}
              color={color}
              size={size}
              containerStyle={iconName}
            />
        }

      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#646464",
          tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
          tabBarStyle: { backgroundColor: "#06E092", height: 55 },
          tabBarHideOnKeyboard: true
        })}
      >
        <Tab.Screen
          name={screen.feed.tab}
          component={FeedNavigation}
          options={{ title: "Empleos" }}
        />
        <Tab.Screen
          name={screen.ranking.tab}
          component={AccountStack}
          options={{ title: "Ranking" }}
        />
        <Tab.Screen
          name={screen.jobs.tab}
          component={JobStack}
          options={{ title: "" }}
        />
        <Tab.Screen
          name={screen.services.tab}
          component={ServiceStack}
          options={() => ({
            title: "Servicios",
            tabBarButton: () => null,
          })}
        />
        <Tab.Screen
          name={screen.favorites.tab}
          component={AccountStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name={screen.account.tab}
          component={AccountStack}
          options={{ title: "Perfil" }}
        />
        <Tab.Screen
          name={screen.account.seeProfile}
          component={SeeProfile}
          options={{ title: "Perfil", tabBarButton: () => null, headerShown: true }}
        />
        <Tab.Screen
          name={screen.feed.jobSeeMore}
          component={JobSeeMoreScreen}
          options={{
            title: "Ver más", tabBarButton: () => null, headerShown: true, headerLeft: () => (
              <Icon
                name="arrow-back"
                size={24}
                color="black"
                iconStyle={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            )
          }}
        />
      </Tab.Navigator>

      {showFAB && (
        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={[styles.fab, styles.shadow]}
            onPress={() => {
              navigation.navigate(screen.jobs.tab)
              setShowFAB(!showFAB);
            }}
          >
            <Icon
              type="material-community"
              name="briefcase-search"
              color="#646464"
            />
            <Text style={styles.label}>Publicar empleo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, styles.shadow]}
            onPress={() => {
              navigation.navigate(screen.services.tab);

              setShowFAB(!showFAB);
            }}
          >
            <Icon
              type="material-community"
              name="hammer-wrench"
              color="#646464"
            />
            <Text style={styles.label}>Publicar servicio</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 80,
    right: "50%",
    left: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  fab: {
    backgroundColor: "#06E092",
    borderRadius: 30,
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  label: {
    color: "#646464",
    fontSize: 10,
    textAlign: "center"
  },
  shadow: {
    elevation: 6,
  }
});
