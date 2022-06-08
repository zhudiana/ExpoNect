import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const FavoriteItem = (props) => {
  const data = props.item;
  const [quantity, setQuantity] = useState(props.item.quantity);

  return (
    <ListItem style={styles.listItems} key={Math.random()} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.product.image
              ? data.product.image
              : "../../../../../assets/avocado.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.product.name}</Text>
        </Left>
        <Right>
          <Text>$ {data.product.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItems: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default FavoriteItem;
