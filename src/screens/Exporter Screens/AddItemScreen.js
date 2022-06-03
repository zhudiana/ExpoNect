import React, {useState, useEffect} from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, Image, Linking, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../../consts/colors';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';


//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



const AddItem = (navigation) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Agricultural', value: 'agricultural'},
    { label: 'Gold', value: 'gold' },
    { label: 'Flower', value: 'flower' },
    { label: 'Leather', value: 'leather' },
    { label: 'Other', value: 'other' }
  ]);
  const [description, setDescription] = useState('');
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
   
  if (hasGalleryPermission === false) {
    return <Text>No access to internal storage</Text>
  }

  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
          <TouchableOpacity>
          <Text style={{fontSize:17, color: 'blue'}}>Cancel</Text>
          </TouchableOpacity> 
        <Text style={{fontSize:18, fontWeight: 'bold', alignItems: 'center'}}>New Listing</Text>
        <TouchableOpacity>
          <Text style={{fontSize:17,color: 'blue',marginLeft:2}}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addItemForm}>
        <Icon name="user-circle" size={28} />
        <Text style={{ marginTop: 1, marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>SAMA TRADING PLC</Text>
      </View>
      <View>
        <Text style={{ marginLeft: 35, marginTop: 1, fontSize: 12 }}>Listing on EXPONECT</Text>
        <View style={styles.addphotobtn}>
          <Button title="Add Photo" onPress={() => pickImage()} />
        </View>
        <View style={styles.imagestyle}>
          {image && <Image
          source={{ uri: image }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 5,
            borderColor: COLORS.dark,
          }} />}
        </View>
            <View style={styles.LabelInput}>
          <FloatingLabelInput
        label="Name"
        value={title}
        keyboardType='name-phone-pad'
        onChangeText={value => setTitle(value)}
          /> 
        </View>
       <View style={styles.LabelInput}>
          <FloatingLabelInput
        label="Price"
        value={price}
        maskType="currency"
        currencyDivider="," // which generates: 9.999.999,99 or 0,99 ...
        keyboardType="numeric"
            onChangeText={value => setPrice(value)
            }
           />
          </View>
        <View style={styles.LabelInput}>
          <FloatingLabelInput
        style={{height:65}}
        label="Description"
        value={description}
        keyboardType='name-phone-pad'
        onChangeText={value => setDescription(value)}
        multiline='true'
         /> 
        </View>
      <Text style={{fontWeight:'bold', fontSize:12, marginTop:10}}>Catagory</Text>
        <View style={styles.dropdown}>
          <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
        </View>
        <View style={{marginTop: 200}}>
          <Text style={{ color: 'gray' }}>
            ExpoNect items are public and can be seen by everyone on ExpoNect.
          </Text>
          <Text style={{ marginTop: 10, color: 'grey'}}>
           All listings go through a quick standard revieww when published to make sure they follow our <Text style={styles.hyperlink}>Commerce Policies</Text> before they are available to others. Items like illegal drugs, weapones,counterfeits and more are not allowed.            
           </Text>
            <Text style={{marginTop:10, color: 'gray'}}>
               ExpoNect listing must not descrimination. See our <Text style={styles.hyperlink}>Descrimination policies</Text>. 
             </Text>
        </View>
          
      
        
        </View>
        </ScrollView>
    </SafeAreaView>
      
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  header: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addItemForm: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 0,
  },
  input: {
    height: 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 1,
    alignItems: 'center',
    marginTop: 15,
    textAlign: 'center',
  },
  addphotobtn: {
    alignItems: 'center',
    elevation: 8,
    backgroundColor: "#00a877",
    borderRadius: 31,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    
  },
  imagestyle: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LabelInput: {
marginTop: 15,
  },
  dropdown: {
    marginTop: 5,
    borderRadius: 20,
  },
  hyperlink: {
color: 'blue',
  },
});
export default AddItem;
