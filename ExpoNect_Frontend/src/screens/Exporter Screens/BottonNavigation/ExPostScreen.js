import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../../../assets/common/baseURL";
import FormContainer from "../../Shared_screens/FormContainer";
import Input from "../../Shared_screens/Input";
import Error from "../../Shared_screens/Error";
import EasyButton from "../../Shared_screens/EasyButton";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import mime from "mime";

const ExPostScreen = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [item, setItem] = useState();

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.brand);
      setName(props.route.params.name);
      setPrice(props.route.params.price.toString());
      setDescription(props.route.params.description);
      setMainImage(props.route.params.image);
      setImage(props.route.params.image);
      setImage(props.route.params.image);
      setCategory(props.route.params.category._id);
    }

    //categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    //image picker
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
    };

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const addProduct = () => {
    if (
      name == "" ||
      brand == "" ||
      price == "" ||
      description == "" ||
      category == ""
    ) {
      setError("please fill in the form correctly");
    }

    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("richDescription", richDescription);
    formData.append("isFeatured", isFeatured);
    // formData.append("exporter", exporter);

    axios
      .post(`${baseURL}products`, formData)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "New Product Added",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("ExMainTabScreen");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "please try again",
        });
      });
  };

  return (
    <FormContainer>
      <View style={styles.upperTextContainer}>
        <Text style={styles.upperText}>Add Product</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text>Brand</Text>
      </View>
      <Input
        placeholder="Brand"
        name="brand"
        id="brand"
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <View style={styles.label}>
        <Text>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        id="price"
        value={price}
        keyboardType={"numeric"}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={styles.label}>
        <Text>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        id="description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
          style={{ width: undefined }}
          placeholder="Select your category"
          selectedValue={pickerValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        >
          {categories.map((c) => {
            return <Picker.Item key={c.id} label={c.name} value={c.id} />;
          })}
        </Picker>
      </Item>
      {error ? <Error message={error} /> : null}
      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Post</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  upperTextContainer: {
    left: 90,
    marginBottom: 30,
  },
  upperText: {
    fontSize: 30,
    fontWeight: "500",
  },
  label: {
    width: "80%",
    marginTop: 10,
    left: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    left: 70,
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ExPostScreen;
