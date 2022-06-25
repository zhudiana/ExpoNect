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
import { useTheme, StackActions } from "@react-navigation/native";
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

import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";

const initialValues = {
  email: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid Email!").required("email is missing"),
});

const Stack = createNativeStackNavigator();

const Email = ({ navigation }) => {
  const { colors } = useTheme();

  const handleLogin = async (value, formikActions) => {
    Keyboard.dismiss();
    try {
      const { data } = await axios.post(
        "http://172.20.10.2:8000/api/v1/exporters/find-email",
        { ...value }
      );
      console.log(data);
      navigation.dispatch(
        StackActions.replace("ExEmailCodeScreen", { profile: data })
      );
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <HideKeyboard>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          errors,
          value,
          touched,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => {
          return (
            <View style={styles.container}>
              <StatusBar backgroundColor="#009387" barstyle="light-content" />
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ExInfoScreen")}
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
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                </View>
                <Text style={{ color: "red" }}>
                  {touched.email && errors.email ? errors.email : ""}{" "}
                </Text>

                {/* Sign up */}
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.confirm}
                    onPress={handleSubmit}
                  >
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() =>
                      navigation.navigate("Login", { profile: handleLogin() })
                    }
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          );
        }}
      </Formik>
    </HideKeyboard>
  );
};

export default Email;

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
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
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
  confirm: {
    width: 300,
  },
  loginBtn: {
    top: 5,
    left: 130,
  },
  loginText: {
    color: "#009387",
    fontWeight: "bold",
  },
});
