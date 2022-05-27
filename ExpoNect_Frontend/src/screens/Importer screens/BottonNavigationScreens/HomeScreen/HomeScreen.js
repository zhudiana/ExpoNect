import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Iconn from "react-native-vector-icons/Ionicons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";

const data = require("../../../../../assets/data/products.json");

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  });

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
          ExpoNect
        </Text>

        <Iconn
          name="ios-chatbubble-ellipses-sharp"
          size={25}
          style={styles.chat_icon}
        />

        <View style={{ marginTop: 45 }}>
          <View style={styles.searchcontainer}>
            <Icon name="search" size={28} style={{ marginTop: 7 }} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={"grey"}
              style={styles.input}
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
            />
            {focus == true ? <Iconn onPress={onBlur} name="ios-close" /> : null}
          </View>
        </View>
      </View>
      {focus == true ? (
        <SearchedProduct productFiltered={productsFiltered} />
      ) : (
        <View styles={styles.listContainer}>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={({ item }) => <ProductList key={item.id} item={item} />}
            keyExtractor={(item) => item.price}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
  },
  listContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    // justifyContent: "space-between",
    // marginLeft: -200,
    // marginRight: 10,
  },
  chat_icon: {
    marginLeft: 190,
  },

  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flexDirection: "row",
    width: 500,
  },
  searchcontainer: {
    height: 40,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    left: -340,
    width: 350,
    flexDirection: "row",
  },
});

export default HomeScreen;
