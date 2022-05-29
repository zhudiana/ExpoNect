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
import OTPInputView from "@twotalltotems/react-native-otp-input";

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
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
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
          {/* Footer */}
          <Animatable.View
            animation="fadeInUpBig"
            style={[styles.footer, { backgroundColor: colors.background }]}
          >
            <Text style={styles.codeSent}>
              We've sent you an email verification code to
            </Text>
            {/* email code Field */}

            {/* OTP code */}
            <View style={styles.otpInput}>
              <OTPInputView
                style={{ width: "80%", height: 200 }}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                  console.log(`Code is ${code}, you are good to go!`);
                }}
              />
            </View>
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
            </View>
          </Animatable.View>
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
    marginTop: -50,
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
  codeSent: {
    color: "grey",
    fontSize: 20,
    textAlign: "center",
    top: -30,
  },
  otpInput: {
    left: 30,
    top: -70,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#999999",
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
