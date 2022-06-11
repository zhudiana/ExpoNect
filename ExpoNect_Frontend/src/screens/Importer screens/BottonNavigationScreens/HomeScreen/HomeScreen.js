import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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

import baseURL from "../../../../../assets/common/baseURL";
import axios from "axios";
import { Container } from "native-base";

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

var { height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      //Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("API call error");
        });

      //categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("API call error");
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  //Product methods
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
            products.filter((i) => i.category._id === ctg),
            setActive(true)
          ),
        ];
  };

  return (
    <>
      {loading == false ? (
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
                {focus == true ? (
                  <Iconn onPress={onBlur} name="ios-close" />
                ) : null}
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
              <View>
                <CategoryFilter
                  categories={categories}
                  CategoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>
              {productsCtg.length > 0 ? (
                <View styles={styles.listContainer}>
                  {productsCtg.map((item) => {
                    return (
                      <ProductList
                        key={item._id.$oid}
                        item={item}
                        navigation={props.navigation}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={[styles.center, { height: "40%" }]}>
                  <Text>No Products Found!</Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      ) : (
        //loading
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="green" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: height,
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
  center: {
    alignItems: "center",
    justifyContent: "center",
    top: 100,
  },
});

export default HomeScreen;
