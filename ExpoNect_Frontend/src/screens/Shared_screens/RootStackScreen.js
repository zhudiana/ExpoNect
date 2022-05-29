import { View, Text } from "react-native";
import React from "react";
import SplashScreen from "./SplashScreen";
import SignInScreen from "../Importer screens/SignInScreen";
import SignUpScreen from "../Importer screens/SignUpScreen";
import ExSignInScreen from "../Exporter Screens/ExSignInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPasswordScreen from "../Importer screens/ForgetPasswordScreen";
import ExForgetPassword from "../Exporter Screens/ExForgetPassword";
import ExMainTabScreen from "../Exporter Screens/BottonNavigation/ExMainTabScreen";
import EmailVerification from "../Importer screens/EmailVerification";
import ExInfoScreen from "../Exporter Screens/ExInfoScreen";
import ExEmailCodeScreen from "../Exporter Screens/ExEmailCodeScreen";
import EmailCodeSent from "../Importer screens/EmailCodeSent";
import TermsOfUseScreen from "./TermsOfUseScreen";
import PrivacyPolicyScreen from "./PrivacyPolicyScreen";
import ExNotificationScreen from "../Exporter Screens/BottonNavigation/ExNotificationScreen";
import ChattingScreen from "../Importer screens/BottonNavigationScreens/ChattingScreen";
import SingleProduct from "../Importer screens/BottonNavigationScreens/HomeScreen/SingleProduct";

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
    <RootStack.Screen name="ExInfoScreen" component={ExInfoScreen} />
    <RootStack.Screen name="ExSignInScreen" component={ExSignInScreen} />
    <RootStack.Screen name="ExForgetPassword" component={ExForgetPassword} />
    <RootStack.Screen name="ExMainTabScreen" component={ExMainTabScreen} />
    <RootStack.Screen name="EmailVerification" component={EmailVerification} />
    <RootStack.Screen name="ExEmailCodeScreen" component={ExEmailCodeScreen} />
    <RootStack.Screen name="EmailCodeSent" component={EmailCodeSent} />
    <RootStack.Screen name="TermsOfUseScreen" component={TermsOfUseScreen} />
    <RootStack.Screen name="ChattingScreen" component={ChattingScreen} />
    <RootStack.Screen name="SingleProduct" component={SingleProduct} />
    <RootStack.Screen
      name="NotificationScreen"
      component={ExNotificationScreen}
    />
    <RootStack.Screen
      name="PrivacyPolicyScreen"
      component={PrivacyPolicyScreen}
    />

    <RootStack.Screen
      name="ForgetPasswordScreen"
      component={ForgetPasswordScreen}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
