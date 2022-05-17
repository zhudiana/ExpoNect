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
import React, { useRef } from "react";
import { color } from "react-native-reanimated";
import { AuthContext } from "../../components/Context";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

//API client
import axios from "axios";
import { useState } from "react/cjs/react.production.min";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EmailVerification = ({ navigation }) => {
  const { colors } = useTheme();
  //   const [code, setCode] = useState("");
  //   const [pinReady, setPinReady] = useState(False);
  const MAX_CODE_LENGTH = 4;

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barstyle="light-content" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("SplashScreen")}>
            <Icon name="arrow-back" style={styles.arrowIcon} size={26} />
          </TouchableOpacity>
          <View style={styles.header_icon}>
            <Icon name="md-lock-open" style={styles.keyIcon} size={60} />
          </View>
          <Text style={styles.text_header}>Account Verification</Text>
        </View>
        {/* Footer */}
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer, { backgroundColor: colors.background }]}
        >
          {/* code input Field */}
          <View style={styles.action}>
            <TextInput
              keyboardType="number-pad"
              returnKeyType="done"
              //   style={[styles.textInput, { color: colors.text }]}
              textContentType="oneTimeCode"
              maxLength={MAX_CODE_LENGTH}
            />
          </View>
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
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
            />
          </View>

          {/* forget password */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPasswordScreen")}
          >
            <Text style={styles.forgetPassword}>Forget Password?</Text>
          </TouchableOpacity>
          {/* Sign in */}
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}>
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
            <Text style={[styles.freeRegisterTextQ, { color: colors.text }]}>
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
    </HideKeyboard>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  arrowIcon: {
    color: "#fff",
    top: 40,
  },
  keyIcon: {
    color: "#009387",
    left: 30,
    top: 20,
  },
  header: {
    flex: 2,
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
  header_icon: {
    backgroundColor: "#fff",
    width: 120,
    height: 120,
    left: 100,
    top: 20,
    borderRadius: 60,
  },
  text_header: {
    top: 30,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
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
