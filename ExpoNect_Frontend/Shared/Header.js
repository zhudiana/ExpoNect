import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Iconn from "react-native-vector-icons/Ionicons";

const Header = () => {
  return (
    <View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          background: "white",
        }}
      >
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
              ExpoNect
            </Text>
          </View>
          <Iconn name="ios-chatbubble-ellipses-sharp" size={25} />
        </View>

        {/* <View style={{ marginTop: 30, flexDirection: "row" }}>
          <View style={styles.searchcontainer}>
            <Icon name="search" size={28} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={"grey"}
              style={styles.input}
            />
          </View>
        </View>
        <CategoryList />
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={products}
          renderItem={({ item }) => {
            return <Card products={item} />;
          }}
        />  */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
  searchcontainer: {
    height: 40,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    left: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },
});

export default Header;
