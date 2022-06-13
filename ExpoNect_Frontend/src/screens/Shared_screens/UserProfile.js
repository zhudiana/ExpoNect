import React, { useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../../assets/common/baseURL";

const UserProfile = (props) => {
  return (
    <View>
      <Text>This is user profile</Text>
    </View>
  );
};

export default UserProfile;
