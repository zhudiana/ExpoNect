import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Icon } from 'react-native-vector-icons/icon';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  SafeAreaView, 
  Image 
} from 'react-native';


const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen  = ({navigation}) => (
       <HomeStack.Navigator screenOptions={{
         headerStyle: {
            backgroundColor: '#009387'
          },
          headerTintColor: '#fff',
          headerTintStyle: {
            fontWeight: 'bold'
          }
      }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          title: "Overview",
          // headerLeft: () => (
          //   <Icon.Button 
          //     name="ios-menu" 
          //     size={25} 
          //     backgroundColor="#009387"
          //     options={()=> {
          //       navigation.openDrawer()}
          //       }>
          //   </Icon.Button>
          // )
        }} />
      </HomeStack.Navigator> 
);

const DetailsStackScreen  = ({navigation}) => (
       <DetailsStack.Navigator screenOptions={{
         headerStyle: {
            backgroundColor: '#009387'
          },
          headerTintColor: '#fff',
          headerTintStyle: {
            fontWeight: 'bold'
          }
      }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
        }} />
      </DetailsStack.Navigator> 
);

export default function App() {
  return (
    <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Details" component={DetailsStackScreen} />
          </Drawer.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
