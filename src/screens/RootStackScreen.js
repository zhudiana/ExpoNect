import { View, Text } from "react-native";
import React from "react";
import SplashScreen from "./SplashScreen";
import SignInScreen from "./Importer screens/SignInScreen";
import SignUpScreen from "./Importer screens/SignUpScreen";
import LoginScreen from "./Exporter Screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPasswordScreen from "./Importer screens/ForgetPasswordScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator
    headerMode="none"
    screenOptions={{
      headerShown: false,
    }}
  >
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen
      name="ForgetPasswordScreen"
      component={ForgetPasswordScreen}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
