import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productFiltered } = props;
  return (
    <Content style={{ width: width }}>
      {productFiltered.length > 0 ? (
        productFiltered.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
            key={item._id.$oid}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.britannica.com/35/129635-050-A8A60DD8/footballs-American-pigskins-rubber-cowhide.jpg?w=690&h=388&c=crop",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedProduct;
