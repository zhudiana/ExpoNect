import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen/HomeScreen";
import ChattingScreen from "./ChattingScreen";
import FavoriteScreen from "./FavoriteScreen";
import MenuScreen from "./MenuScreen";
import { View } from "react-native";

import FavoriteIcon from "../FavoriteIcon";

// const HomeStack = createNativeStackNavigator();
// const DetailsStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({ route }) => {
  const profile = route.params.profile;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favourite",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="ios-heart" color={color} size={26} />
              <FavoriteIcon />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={ChattingScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon
              name="ios-chatbubble-ellipses-sharp"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        initialParams={{ profile: profile }}
        options={{
          tabBarLabel: "Menu",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-menu" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
