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
import { SwipeListView } from "react-native-swipe-list-view";
import FavoriteItem from "../FavoriteItem";

import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../../../Redux/Actions/favoriteActions";

var { height, width } = Dimensions.get("window");

const FavoriteScreen = (props) => {
  return (
    <>
      {props.favoriteItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Favorite</H1>
          <SwipeListView
            data={props.favoriteItems}
            renderItem={(data) => {
              <FavoriteItem item={data} />;
            }}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity style={styles.hiddenButton}>
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Right>
              <Button title="Clear" onPress={() => props.clearFavorite()} />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
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
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
