import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./src/screens/DrawerContent";
import MainTabScreen from "./src/screens/MainTabScreen";
import RootStackScreen from "./src/screens/RootStackScreen";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
} from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* <Drawer.Navigator>
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MainTabScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
