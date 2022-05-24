import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ExHomeScreen from "./ExHomeScreen";
import ExChatScreen from "./ExChatScreen";
import ExMenuScreen from "./ExMenuScreen";
import ExNotificationScreen from "./ExNotificationScreen";
import ExPostScreen from "./ExPostScreen";
import { View } from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createMaterialBottomTabNavigator();

const customTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const ExMainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{
        backgroundColor: "#009387",
        position: "absolute",
      }}
    >
      <Tab.Screen
        name="Home"
        component={ExHomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={ExNotificationScreen}
        options={{
          tabBarLabel: "Notification",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={ExPostScreen}
        options={{
          tabBarLabel: "Post",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-add" color={color} size={30} />
          ),
          tabBarButton: (props) => <customTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ExChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon
              name="ios-chatbubble-ellipses-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={ExMenuScreen}
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

export default ExMainTabScreen;
