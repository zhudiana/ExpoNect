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
import * as Animatable from "react-native-animatable";
import React, { useRef, useEffect, useState } from "react";
import { useTheme, StackActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { verifyEmailExporter } from "../../../utils/auth";

const inputs = Array(4).fill("");
let newInputIndex = 0;

const isObjValid = (obj) => {
  return Object.values(obj).every((val) => val.trim());
};

const ExEmailCodeScreen = ({ navigation }) => {
  // const profile = route.params.profile;
  const input = useRef();
  const { colors } = useTheme();
  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const [nextInputIndex, setNextInputIndex] = useState(0);

  const handleChangeText = (text, index) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  // const verifyEmailExporter = async (otp, exporterId) => {
  //   const exporter = axios.create({
  //     baseURL: "http://192.168.100.6/:8000/api/v1",
  //   });
  //   try {
  //     const { data } = await exporter.post("/exporters/verify-email", {
  //       otp,
  //       exporterId,
  //     });
  //     return data;
  //   } catch (error) {
  //     return catchError(error);
  //   }
  // };

  const submitOTP = async () => {
    Keyboard.dismiss();

    if (isObjValid(OTP)) {
      let val = "";

      Object.values(OTP).forEach((v) => {
        val += v;
      });
      // const verifyEmailExporter = async (values, formikActions) => {
      //   try {
      //     const { data } = await axios.post(
      //       "http://192.168.100.6:8000/api/v1/exporters/verify-email",
      //       { ...values }
      //     );
      //     console.log(data);
      //     navigation.dispatch(StackActions.replace("MainTabScreen"));
      //   } catch (error) {
      //     console.log(error?.response?.data);
      //   }
      // };
      navigation.dispatch(StackActions.replace("ExMainTabScreen"));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barstyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ExInfoScreen")}>
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
            We've sent you an email verification code to your email
          </Text>
          {/* email code Field */}

          {/* OTP code */}
          <View style={styles.otpContainer}>
            {inputs.map((inp, index) => {
              return (
                <View key={index.toString()} style={styles.inputContainer}>
                  <TextInput
                    value={OTP[index]}
                    onChangeText={(text) => handleChangeText(text, index)}
                    placeholder="0"
                    keyboardType="numeric"
                    maxLength={1}
                    ref={nextInputIndex === index ? input : null}
                    style={styles.input}
                  />
                </View>
              );
            })}
          </View>

          {/* Sign in */}
          <TouchableOpacity onPress={submitOTP} style={styles.button}>
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
                Verify
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default ExEmailCodeScreen;

const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  arrowIcon: {
    color: "#fff",
    top: 70,
  },
  keyIcon: {
    color: "#009387",
    left: 30,
    top: 20,
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

  codeSent: {
    color: "grey",
    fontSize: 20,
    textAlign: "center",
    top: -30,
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
  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: "#009387",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 25,
    paddingHorizontal: 22,
    paddingVertical: 15,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  button: {
    marginTop: 50,
  },
});
