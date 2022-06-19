import React from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabScreen from "./src/screens/Importer screens/BottonNavigationScreens/MainTabScreen";
//import ExMainTabScreen from "./src/screens/Exporter Screens/BottonNavigation/ExMainTabScreen";
import RootStackScreen from "./src/screens/Shared_screens/RootStackScreen";
import { StyleSheet, View, LogBox } from "react-native";
import { ActivityIndicator } from "react-native-web";
import { useEffect } from "react";
import { AuthContext } from "./src/components/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExMainTabScreen from "./src/screens/Exporter Screens/BottonNavigation/ExMainTabScreen";

// redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//context api
import Auth from "./Context/store/Auth";
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs(true);

export default function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };
  const CustomDarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      //Reducer function
      case "RETRIEVE_TOKEN": //check if the user loged in before
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        let userToken;
        // userToken = null;
        if (userName == "user" && password == "pass") {
          //use db here by checking user name from db
          try {
            userToken = "hello";
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },

      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // console.log("user token: ", userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <ActivityIndicator size="large" /> */}
      </View>
    );
  }
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer theme={theme}>
          <RootStackScreen />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
