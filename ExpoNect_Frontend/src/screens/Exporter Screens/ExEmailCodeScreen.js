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
import OTPInputView from "@twotalltotems/react-native-otp-input";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ExEmailCodeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    checkTextInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
  });

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
          <Text style={styles.text_header}>Enter Email code</Text>
        </View>
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

          {/* Request code */}
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => navigation.navigate("ExEmailCodeScreen")}
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
                  Log in
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </HideKeyboard>
  );
};

export default ExEmailCodeScreen;

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
  codeSent: {
    color: "grey",
    fontSize: 20,
    textAlign: "center",
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
  otpInput: {
    left: 30,
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
