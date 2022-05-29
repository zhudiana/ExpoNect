import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen/HomeScreen";
import ChattingScreen from "./ChattingScreen";
import FavoriteScreen from "./FavoriteScreen";
import ProfileScreen from "./ProfileScreen";
import MenuScreen from "./MenuScreen";

const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{ backgroundColor: "tomato" }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
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
          <Icon name="ios-heart" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
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
          <Icon name="ios-chatbubble-ellipses-sharp" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Menu"
      component={MenuScreen}
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

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerTintColor: "#fff",
      headerTintStyle: {
        fontWeight: "bold",
      },
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default MainTabScreen;
