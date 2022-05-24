import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          //   animation="bounceIn"
          //   duration="1500"
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[styles.footer, { backgroundColor: colors.background }]}
        animation="fadeInUpBig"
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Stay connected with everyone!
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>ExpoNect Importer</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("ExInfoScreen")}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>ExpoNect Exporter</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    backgroundColor: "#009387",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    // flex: 1,
    backgroundColor: "#fff",
    height: 500,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    marginTop: 350,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    marginTop: 300,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 180,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
