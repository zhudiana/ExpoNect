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
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import React from "react";
import { AuthContext } from "../../components/Context";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import { Formik } from "formik";
import * as yup from "yup";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const initialValues = {
  email: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid Email!").required("email is missing"),
});

const ForgetPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const handleRequestCode = async (values, formikActions) => {
    try {
      const { data } = await axios.post(
        "http://192.168.100.6:8000/api/v1/importers/forgot-password",
        values.email
      );
      console.log(data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const [text, onChangeText] = React.useState("");

  return (
    <HideKeyboard>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRequestCode}
      >
        {({
          errors,
          values,
          touched,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => {
          console.log(errors, values);
          return (
            <>
              <View style={styles.container}>
                <StatusBar backgroundColor="#009387" barstyle="light-content" />
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
                  <Text style={styles.text_header}>Verify Email</Text>
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
                    <FontAwesome name="user-o" color={colors.text} size={20} />
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

                  {/* Request code */}
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
                          Request Code
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              </View>
            </>
          );
        }}
      </Formik>
    </HideKeyboard>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
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
  arrowIcon: {
    color: "#fff",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    top: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 50,
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
