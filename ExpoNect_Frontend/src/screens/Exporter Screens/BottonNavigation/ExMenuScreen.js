import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import { useLinkProps, useTheme } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableRipple, Avatar, Title, Caption } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../../../assets/common/baseURL";

import AuthGlobal from "../../../../Context/store/AuthGlobal";
import { logoutUser } from "../../../../Context/actions/Auth.actions";

const ExMenuScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const context = useContext(AuthGlobal);
  const navigationTheme = useTheme();
  // const profile = route.params.profile;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            // source={require("../../../../assets/avocado.png")}
            size={80}
            backgroundColor={" "}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                ,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {/* <Text>{profile.importer.name}</Text> */}
            </Title>
            <Caption style={[styles.caption]}>@Sama_trading</Caption>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Addis Ababa, ETHIOPIA
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              +251913667830
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              sama_trading@gmail.com
            </Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#625D5D" size={25} />
              <Text style={styles.menuItemText}>Payment Terms</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#625D5D" size={25} />
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => navigation.navigate("TermsOfUseScreen")}
          >
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#625D5D" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => navigation.navigate("PrivacyPolicyScreen")}
          >
            <View style={styles.menuItem}>
              <Icon name="shield" color="#625D5D" size={25} />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
          </TouchableRipple>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SplashScreen")}>
          <View style={styles.menuitem}>
            <Text style={[styles.logoutText, { color: colors.text }]}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExMenuScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#d3d3d3",
  },
  menuitem: {
    marginTop: 20,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  logoutIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 12,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 30,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
