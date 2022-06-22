import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
//hide keyboard
const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//
const ForgetPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const handleSignup = async (values, formikActions) => {
    try {
      const { data } = await axios.get(
        "http:/172.20.10.2:8000/api/v1/exporters/",
        { ...values }
      );
      console.log(data);
      navigation.dispatch(
        StackActions.replace("EmailVerification", { profile: data })
      );
      res;
    } catch (error) {
      console.log(error?.response?.data);
    }

    // console.log(data);
  };

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barstyle="light-content" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExSignInScreen")}
          >
            <Icon name="arrow-back" style={styles.arrowIcon} size={26} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Email</Text>
        </View>
        {/* Footer */}
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer, { backgroundColor: colors.background }]}
        >
          {/* Email Field */}
          <Text style={[styles.text_footer, { color: colors.text }]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Please enter your email"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>

          {/* Sign up */}
          <View style={styles.button}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Confirm
              </Text>
            </LinearGradient>
          </View>
        </Animatable.View>
      </View>
    </HideKeyboard>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  arrowIcon: {
    color: "#fff",
    top: 25,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    left: 40,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 20,
  },
  text_footerr: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  textInputt: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginBack: {
    color: "#009387",
    fontWeight: "bold",
    marginLeft: 280,
    marginTop: -17,
  },
  alreadyAccount: {
    marginLeft: 70,
    marginTop: 10,
  },
  coloredText: {
    color: "#009387",
  },
  wholeText: {
    marginTop: 40,
    marginBottom: -5,
  },
  sendButton: {
    marginTop: 20,
  },
  sendButtonn: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
