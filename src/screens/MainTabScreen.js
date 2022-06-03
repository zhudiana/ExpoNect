import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";




import AddItemScreen from './Exporter Screens/AddItemScreen'
import MenuScreen from "./MenuScreen";
import EditProfileScreen from "./Exporter Screens/EditProfileScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";
import { View, Text, SafeAreaView, Button } from "react-native";
import { color } from "react-native-reanimated";

import HomeScreen from '../screens/HomeScreen'

import NotificationScreen from "../screens/NotificationScreen.js";
import FavoriteScreen from "../screens/Importer screens/BottonNavigationScreens/FavoriteScreen";








const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();

const MenuStack = createNativeStackNavigator();



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
      name="Add item"
      component={AddItemScreen}
      options={{
        tabBarLabel: "Add item",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="add" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        tabBarLabel: "Notification",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Menu"

      component={MenuStackScreen}

      

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
      headerStyle: {
        backgroundColor: "#009387",
      },
      headerTintColor: "#fff",
      headerTintStyle: {
        fontWeight: "bold",
      },
      // headerShown: false
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
         headerShown: false
      }}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#009387",
      },
      headerTintColor: "#fff",
      headerTintStyle: {
        fontWeight: "bold",
      },
      // headerShown: false
    }}
  >
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{}}
    />
  </DetailsStack.Navigator>
);

const MenuStackScreen = ({ navigation }) => {

  const { colors } = useTheme();
  
  return (
  <MenuStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
       elevation: 0,
        shadowColor: colors.background,
      },
      headerTintColor: colors.text,
   
    //headerShown: false
    }}
  >
    <MenuStack.Screen
      name="Menu"
      component={MenuScreen}
      options={{
         title: '',
         headerRight: () => (
            <View style={{marginLeft: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={29}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        
         
      }}
    />
    <MenuStack.Screen
      name="EditProfile"
      component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
        
      />
  </MenuStack.Navigator>
)};


export default MainTabScreen;
