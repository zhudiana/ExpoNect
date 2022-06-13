import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import EasyButton from "../../../Shared_screens/EasyButton";

const ProductDetail = (props) => {
  const [item, setItem] = useState(props.route.params.item);

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("MainTabScreen")}
            onPress={() => props.navigation.navigate("ExMainTabScreen")}
          >
            <Icon name="arrow-back" style={styles.arrowIcon} size={26} />
          </TouchableOpacity>
          <Image
            source={{
              uri: item.image
                ? "https://www.worldatlas.com/r/w1200/upload/12/f8/83/coffee-cup.jpg"
                : "https://www.worldatlas.com/r/w1200/upload/12/f8/83/coffee-cup.jpg",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style="{styles.contentContainer">
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
          <Text style={styles.contentText}>{item.description}</Text>
          <Text style={styles.contentText}>{item.richDescription}</Text>
        </View>
        {/* ToDo: Description, rich Description */}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}> $ {item.price}</Text>
        </Left>
        <Right>
          <TouchableOpacity>
            <EasyButton
              medium
              primary
              onPress={() => [
                props.navigation.navigate("ExPostScreen"),
                { item: props },
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>
          </TouchableOpacity>
        </Right>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 250,
  },
  arrowIcon: {
    color: "black",
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  chat_icon: {
    right: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductDetail;
