import React from 'react';
import { TextInput, View, Text, Button, StyleSheet, FlatList } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoriteScreen from "./FavoriteScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native-paper";
import COLORS from "../../../consts/colors";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import products from '../../../consts/products';
import { Dimensions } from 'react-native-web';
import { Image } from 'react';
import  {useState, Component, ImageBackground} from 'react';

const width = Dimensions.get("screen").width / 2-30;
const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const categories = ['Agricultural', 'Leather', 'Gold', 'Others']
  const [categoryIndex,setCategoryIndex] = React.useState(0)
const CategoryList = () => {
  return (
    <View style={styles.categoryContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity key={index}
          activeOpacity={0.8}
          onPress={() => setCategoryIndex(index)}>
          <Text style={[styles.categoryText, categoryIndex == index && styles.categoryTextSelected,]}>
          {item}
        </Text>
        </TouchableOpacity>
        
      ))}
    </View>
  );
};
  
  const Card = ({ products }) => {
    return (
      <View style={styles.card}>
        <View style={{
          alignItems: 'flex-end',
          position: 'absolute',
                right: 5,
          top: 5,
        }}>
           <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: products.like
                  ? 'rgba(245, 42, 42,0.2)'
                  : 'rgba(0,0,0,0.2) ',
              }}>
          
        <Icon name="favorite" size={18}
              color={products.like ? COLORS.red : COLORS.black}
              style={{
                position: 'absolute',
                right: 5,
                top: 5,
              }}
            />
            
       </View>
        </View>
        </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        background: Colors.white,
      }}>
         <View style={styles.header}>
      <View>
        <Text style={{fontSize:25, fontWeight:'bold'}}>Welcome to</Text>
        <Text style={{fontSize:35, fontWeight:'bold', color:'green'}}>ExpoNect</Text>
      </View>
    <Icon name="chat" size={25} />
      </View>
      <View style={{ marginTop: 30, flexDirection: 'row' }}>
        <View style={styles.searchcontainer}>
          <Icon name="search" size={28}  />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} />
        </View>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={products}
        renderItem={({ item }) => { return <Card products={item} />; }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  searchcontainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1, 
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold', 
  },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
   height: 225,
    backgroundColor: COLORS.light,
    width,
   marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 2,
    marginLeft: 2,
    padding: 85,
   
  },
 
});

export default HomeScreen;
