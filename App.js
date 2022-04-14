import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/screens/DrawerContent';


import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  SafeAreaView, 
  Image 
} from 'react-native';
import MainTabScreen from './src/screens/MainTabScreen';

const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={MainTabScreen} />
            {/* <Drawer.Screen name="Details" component={DetailsStackScreen} /> */}
          </Drawer.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
