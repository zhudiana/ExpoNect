import { View, Text } from "react-native";
import React from "react";
import SplashScreen from "./SplashScreen";
import SignInScreen from "./Importer screens/SignInScreen";
import SignUpScreen from "./Importer screens/SignUpScreen";
import ExSignInScreen from "./Exporter Screens/ExSignInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPasswordScreen from "./Importer screens/ForgetPasswordScreen";
import ExForgetPassword from "./Exporter Screens/ExForgetPassword";
import ExMainTabScreen from "./Exporter Screens/BottonNavigation/ExMainTabScreen";
import EmailVerification from "./Importer screens/EmailVerification";

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
    <RootStack.Screen name="ExSignInScreen" component={ExSignInScreen} />
    <RootStack.Screen name="ExForgetPassword" component={ExForgetPassword} />
    <RootStack.Screen name="ExMainTabScreen" component={ExMainTabScreen} />
    <RootStack.Screen name="EmailVerification" component={EmailVerification} />
    <RootStack.Screen
      name="ForgetPasswordScreen"
      component={ForgetPasswordScreen}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
