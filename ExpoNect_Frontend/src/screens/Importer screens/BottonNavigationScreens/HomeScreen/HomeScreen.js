import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Iconn from "react-native-vector-icons/Ionicons";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import CategoryFilter from "./CategoryFilter";

const data = require("../../../../../assets/data/products.json");
const productsCategories = require("../../../../../assets/data/categories.json");

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const HomeScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productsCategories);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
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

  //categories
  const changeCtg = (ctg) => {
    ctg === "all"
      ? [setProductsCtg(initialState), setActive(true)]
      : [
          setProductsCtg(
            products.filter((i) => i.category.$oid === ctg),
            setActive(true)
          ),
        ];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HideKeyboard>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "green",
              left: 10,
            }}
          >
            ExpoNect
          </Text>
        </HideKeyboard>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("ChattingScreen")}
        >
          <Iconn
            name="ios-chatbubble-ellipses-sharp"
            size={25}
            style={styles.chat_icon}
          />
        </TouchableOpacity>

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
        <SearchedProduct
          navigation={props.navigation}
          productFiltered={productsFiltered}
        />
      ) : (
        <ScrollView>
          <View styles={styles.listContainer}>
            <View>
              <CategoryFilter
                categories={categories}
                CategoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>

            <FlatList
              numColumns={2}
              data={products}
              renderItem={({ item }) => (
                <ProductList
                  navigation={props.navigation}
                  key={item._id}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.price}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
