import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import Iconn from "react-native-vector-icons/Ionicons";

import { connect } from "react-redux";
import * as actions from "../../../../Redux/Actions/favoriteActions";

var { height, width } = Dimensions.get("window");

const FavoriteScreen = (props) => {
  return (
    <>
      {props.favoriteItems.length ? (
        <Container>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("MainTabScreen")}
          >
            <Iconn name="arrow-back" style={styles.arrowIconn} size={26} />
          </TouchableOpacity>
          <H1 style={{ alignSelf: "center" }}>Favorite</H1>
          {props.favoriteItems.map((data) => {
            return (
              <ListItem style={styles.ListItems} key={Math.random()} avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: data.product.image
                        ? "https://www.worldatlas.com/r/w1200/upload/12/f8/83/coffee-cup.jpg"
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
                <View>
                  <TouchableOpacity
                    onPress={() => props.removeFromFavorite(data)}
                  >
                    <Icon
                      name="trash"
                      color={"black"}
                      size={25}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              </ListItem>
            );
          })}
          <View style={styles.bottomContainer}>
            <Right>
              <Button title="Clear" onPress={() => props.clearFavorite()} />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("MainTabScreen")}
          >
            <Iconn name="arrow-back" style={styles.arrowIcon} size={36} />
          </TouchableOpacity>
          <Text>No Favorites</Text>
          <Text>Add your favorite products here!</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { favoriteItems } = state;
  return {
    favoriteItems: favoriteItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFavorite: () => dispatch(actions.clearFavorite()),
    removeFromFavorite: (item) => dispatch(actions.removeFromFavorite(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  ss: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  deleteIcon: {
    marginRight: 10,
  },
  arrowIcon: {
    top: -250,
    left: -150,
  },
  arrowIconn: {
    top: 20,
    left: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
