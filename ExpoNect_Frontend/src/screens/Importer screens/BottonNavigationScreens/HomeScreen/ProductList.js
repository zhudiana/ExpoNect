import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

import ProductCard from "./ProductCard";
import Header from "../../../../../Shared/Header";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() => props.navigation.navigate("SingleProduct", { item: item })}
    >
      <View
        style={{
          width: width,
          backgroundColor: "#fff",
        }}
      >
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};
export default ProductList;
