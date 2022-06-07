import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { ListItem, Badge, Text, NativeBaseProvider } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "#fff", height: 50 }}
    >
      <ListItem style={{ margin: 10, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.CategoryFilter("all"), props.setActive(-1);
          }}
          // style={{ right: 10 }}
        >
          <Badge
            style={
              (styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive)
            }
          >
            <Text style={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpacity>

        {props.categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.CategoryFilter(item._id.$oid),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={
                (styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive)
              }
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e2eb",
  },
});

export default CategoryFilter;
