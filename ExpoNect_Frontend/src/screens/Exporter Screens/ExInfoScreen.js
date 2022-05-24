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
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { AuthContext } from "../../components/Context";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Accordion from "react-native-collapsible/Accordion";
import Collapsible from "react-native-collapsible";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

//informations to be displayed
const CONTENT = [
  {
    title: "Step 1",
    content:
      'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
  },
  {
    title: "Step 2",
    content:
      "A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.",
  },
  {
    title: "Step 3",
    content:
      "Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.",
  },
  {
    title: "Step 4",
    content:
      "Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.",
  },
];

const ExInfoScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [activeSections, setActiveSections] = useState([]);

  const [collapsed, setCollapsed] = useState(true);

  const [multipleSelect, setMultipleSelect] = useState(false);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ textAlign: "center" }}
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barstyle="light-content" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("SplashScreen")}>
            <Icon name="arrow-back" style={styles.arrowIcon} size={26} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Welcome Exporters!</Text>
        </View>
        {/* Footer */}
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer, { backgroundColor: colors.background }]}
        >
          {/* information */}
          <Text style={styles.regProcess}>Registration Process</Text>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container2}>
              <ScrollView>
                {/*Code for Accordion/Expandable List starts here*/}
                <Accordion
                  activeSections={activeSections}
                  sections={CONTENT}
                  expandMultiple={multipleSelect}
                  renderHeader={renderHeader}
                  renderContent={renderContent}
                  duration={400}
                  onChange={setSections}
                />
                {/*Code for Accordion/Expandable List ends here*/}
              </ScrollView>
            </View>
          </SafeAreaView>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExSignInScreen")}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </HideKeyboard>
  );
};

export default ExInfoScreen;

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
  step1: {
    backgroundColor: "#009387",
    height: 50,
  },
  step2: {
    backgroundColor: "#009387",
    height: 50,
    top: 10,
  },
  //collapsible
  container2: {
    borderRadius: 15,
    backgroundColor: "#009387",
  },
  regProcess: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    bottom: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 20,
  },
  header: {
    padding: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    // backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    // backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    textAlign: "center",
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  signIn: {
    width: 180,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    left: 150,
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
