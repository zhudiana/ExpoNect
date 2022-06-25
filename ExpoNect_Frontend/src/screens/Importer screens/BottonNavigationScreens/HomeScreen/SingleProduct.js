import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("MainTabScreen")}
            onPress={() => props.navigation.navigate("MainTabScreen")}
          >
            <Icon name="arrow-back" style={styles.arrowIcon} size={26} />
          </TouchableOpacity>
          <Image
            source={{
              uri: item.image
                ? "https://www.worldatlas.com/r/w1200/upload/12/f8/83/coffee-cup.jpg"
                : "https://cdn.britannica.com/35/129635-050-A8A60DD8/footballs-American-pigskins-rubber-cowhide.jpg?w=690&h=388&c=crop",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style="{styles.contentContainer">
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.label}>Brand: </Text>
          <Text style={styles.contentText}>{item.brand}</Text>
          <Text style={styles.label}>Description: </Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.labelP}>Price: </Text>
          <Text style={styles.price}> ${item.price} per 5 kilograms</Text>
        </View>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ProfileScreen")}
          >
            <Text style={styles.proText}>View Exporter Profile</Text>
          </TouchableOpacity>
        </View>
        {/* ToDo: Description, rich Description */}
      </ScrollView>

      <View style={styles.bottomContainer}>
        {/* <Left> */}

        {/* </Left> */}
        <Right>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("ChattingScreen")}
          >
            <Icon
              name="ios-chatbubble-ellipses-sharp"
              size={25}
              style={styles.chat_icon}
            />
          </TouchableOpacity> */}
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
    fontSize: 15,
    left: 50,
    top: -12,
  },
  description: {
    width: 360,
    left: 10,
    fontSize: 15,
    top: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    top: -1,
    left: 40,
  },
  chat_icon: {
    right: 10,
  },
  label: {
    fontWeight: "bold",
    top: 5,
  },
  labelP: {
    fontWeight: "bold",
    top: 15,
  },
  profile: {
    top: 20,
    backgroundColor: "#009387",
    width: 105,
    height: 50,
    borderRadius: 10,
  },
  proText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    top: 10,
  },
});

export default SingleProduct;
