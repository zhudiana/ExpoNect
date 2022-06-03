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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { color } from "react-native-reanimated";
import { AuthContext } from "../../components/Context";
import { StackActions, useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

//API client
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { signin } from "../../../utils/auth";
import { updateNotification } from "../../../utils/helper";
import AppNotification from "../../components/AppNotification";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid Email!").required("email is missing"),
  password: yup
    .string()
    .trim()
    .min(8, "password is too short!")
    .required("password is missing"),
});

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const { signIn } = React.useContext(AuthContext);

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLogin = async (values, formikActions) => {
    try {
      //  const res = await signup(values);
      const { data } = await axios.post(
        "http://192.168.100.6:8000/api/v1/importers/login",
        { ...values }
      );
      console.log(data);
      navigation.dispatch(StackActions.replace("MainTabScreen"));
    } catch (error) {
      console.log(error?.response?.data);
    }
    // if (!data.response) return updateNotification(setMessage, error?.response?.data);
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
          onSubmit={handleLogin}
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
                      onPress={() => navigation.navigate("SplashScreen")}
                    >
                      <Icon
                        name="arrow-back"
                        style={styles.arrowIcon}
                        size={26}
                      />
                    </TouchableOpacity>
                    <Text style={styles.text_header}>
                      Welcome to Login to ExpoNect!
                    </Text>
                  </View>
                  {/* Footer */}
                  <Animatable.View
                    animation="fadeInUpBig"
                    style={[
                      styles.footer,
                      { backgroundColor: colors.background },
                    ]}
                  >
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
                        style={[styles.textInput, { color: colors.text }]}
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
                        style={[styles.textInput, { color: colors.text }]}
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

                    {/* forget password */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ForgetPasswordScreen")
                      }
                    >
                      <Text style={styles.forgetPassword}>
                        Forget Password?
                      </Text>
                    </TouchableOpacity>

                    {/* Sign in */}
                    <View style={styles.button}>
                      <TouchableOpacity
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
                            Login
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      {/* Sign up*/}
                      <Text
                        style={[
                          styles.freeRegisterTextQ,
                          { color: colors.text },
                        ]}
                      >
                        Don't have an account?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("SignUpScreen")}
                      >
                        <Text
                          style={[
                            styles.freeRegisterText,
                            {
                              color: "#009387",
                              fontWeight: "bold",
                            },
                          ]}
                        >
                          Free Register Now!
                        </Text>
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
  arrowIcon: {
    color: "#fff",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
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
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
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
  forgetPassword: {
    color: "#009387",
    marginTop: 15,
    marginLeft: 220,
  },
  freeRegisterTextQ: {
    marginLeft: -90,
    marginTop: 10,
  },
  freeRegisterText: {
    marginLeft: 200,
    marginTop: -17,
  },
});
