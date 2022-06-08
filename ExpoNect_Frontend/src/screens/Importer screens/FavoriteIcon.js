import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const FavoriteIcon = (props) => {
  return (
    <>
      {props.favoriteItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.favoriteItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { favoriteItems } = state;
  return {
    favoriteItems: favoriteItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(FavoriteIcon);
