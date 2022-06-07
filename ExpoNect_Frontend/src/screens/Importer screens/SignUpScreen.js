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
import { StackActions, useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import importer from "../../../api/importer";
import signup from "../../../utils/auth";
import axios from "axios";
import AppNotification from "../../components/AppNotification";
import { updateNotification } from "../../../utils/helper";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = yup.object({
  name: yup.string().trim().required("Name is missing"),
  email: yup.string().email("Invalid Email!").required("email is missing"),
  password: yup
    .string()
    .trim()
    .min(8, "password is too short!")
    .required("password is missing"),
});

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [data, setData] = React.useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleSignup = async (values, formikActions) => {
    try {
      const { data } = await axios.post(
        "http://192.168.100.6:8000/api/v1/importers/create",
        { ...values }
      );
      console.log(data);
      res;
    } catch (error) {
      console.log(error?.response?.data);
    }
    navigation.dispatch(
      StackActions.replace("EmailVerification", { profile: data })
    );
  };

  const [text, onChangeText] = React.useState("");

  return (
    <>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <HideKeyboard>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({
            errors,
            values,
            touched,
            handleSubmit,
            handleBlur,
            handleChange,
          }) => {
            {
              /* console.log(errors, values); */
            }
            return (
              <>
                <View style={styles.container}>
                  <StatusBar
                    backgroundColor="#009387"
                    barstyle="light-content"
                  />
                  {/* Header */}
                  <View style={styles.header}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignInScreen")}
                    >
                      <Icon
                        name="arrow-back"
                        style={styles.arrowIcon}
                        size={26}
                      />
                    </TouchableOpacity>
                    <Text style={styles.text_header}>Register Now!</Text>
                  </View>
                  {/* Footer */}
                  <Animatable.View
                    animation="fadeInUpBig"
                    style={[
                      styles.footer,
                      { backgroundColor: colors.background },
                    ]}
                  >
                    {/* name */}
                    <Text style={[styles.text_footer, { color: colors.text }]}>
                      Name
                    </Text>
                    <View style={styles.action}>
                      <TextInput
                        placeholder="Please enter your name"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                    </View>
                    <Text style={{ color: "red" }}>{errors.name}</Text>

                    {/* Email Field */}

                    <Text style={[styles.text_footer, { color: colors.text }]}>
                      Email
                    </Text>
                    <View style={styles.action}>
                      <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                      />

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
                    {/* Password Field */}
                    <Text
                      style={[
                        styles.text_footer,
                        {
                          marginTop: 35,
                        },
                        ,
                        { color: colors.text },
                      ]}
                    >
                      Password
                    </Text>
                    <View style={styles.action}>
                      <Feather name="lock" color={colors.text} size={20} />

                      <TextInput
                        placeholder="Please enter your password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                      />
                      <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? (
                          <Feather name="eye-off" color="grey" size={20} />
                        ) : (
                          <Feather name="eye" color="grey" size={20} />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text style={{ color: "red" }}>
                      {touched.password && errors.password
                        ? errors.password
                        : ""}{" "}
                    </Text>

                    <Text style={[styles.wholeText, { color: colors.text }]}>
                      By registering, you comfirm that you accept our{" "}
                      <TouchableOpacity
                        onPress={() => navigation.navigate("TermsOfUseScreen")}
                      >
                        <Text style={styles.coloredText}>Terms of Use </Text>
                      </TouchableOpacity>
                      and{" "}
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("PrivacyPolicyScreen")
                        }
                      >
                        <Text style={styles.coloredText}>Privacy Policy</Text>
                      </TouchableOpacity>
                    </Text>

                    {/* Sign up */}
                    <View style={styles.button}>
                      <TouchableOpacity
                        colors={["#08d4c4", "#01ab9d"]}
                        style={styles.signIn}
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
                            Register
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      {/* Sign in*/}
                      <Text
                        style={[styles.alreadyAccount, { color: colors.text }]}
                      >
                        Already hava an account?{" "}
                      </Text>
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.loginBack]}>Log in</Text>
                      </TouchableOpacity>
                    </View>
                  </Animatable.View>
                </View>
              </>
            );
          }}
        </Formik>
      </HideKeyboard>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
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
  arrowIcon: {
    color: "#fff",
    top: 25,
    left: 10,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
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
    marginTop: 10,
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
    top: 3,
  },
  wholeText: {
    marginTop: 40,
    marginBottom: -5,
  },
});
