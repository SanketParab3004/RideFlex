import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList, KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase('user_db');

const AddCarScreen = ({ route, navigation }) => {
  const userId = route.params?.userId;

  const [carName, setCarName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carAddress, setCarAddress] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [carDescription, setCarDescription] = useState('');
  const [carSpecifications, setCarSpecifications] = useState('');
  const [carSeats, setCarSeats] = useState('');
  const [carType, setCarType] = useState('');
  const [carTransmission, setCarTransmission] = useState('');
  const [carDeliveryType, setCarDeliveryType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [carImages, setCarImages] = useState([]);

  const handleAddCar = () => {
    console.log('Adding new car:', carName, carDescription, carPrice, carImages);

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO cars ( name, model, address, price, description, specifications, images, seats, carType, transmission, deliveryType, startDate, endDate, Addedby_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          carName,
          carModel,
          carAddress,
          carPrice,
          carDescription,
          carSpecifications,
          JSON.stringify(carImages),
          carSeats,
          carType,
          carTransmission,
          carDeliveryType,
          startDate,
          endDate,
          userId,
        ],

        (_, result) => {
          console.log('Car inserted:', result);
           navigation.goBack(); 
        },
        (_, error) => {
          console.log('Error inserting car:', error);
           alert('Error inserting car:', error.message); 
        }
      );
    });

  };

  // Image upload remains unchanged

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCarImages([...carImages, result.uri]);

      const localUri = result.uri;
      
      const fileName = localUri.split('/').pop();
      const newPath = FileSystem.documentDirectory + fileName;
      console.log("newPath");
        console.log(newPath);
      try {
       
        await FileSystem.moveAsync({
            from: localUri,
            to: newPath,
        });
        setCarImages([...carImages, newPath]);
        
    } catch (error) {
        console.error("Error saving the image: ", error);
    }
    }
  };

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.uploadedImage} />
  );
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
  >


    <ScrollView contentContainerStyle={styles.ScrollViewcontainer}>
      <Text style={styles.title}>Add New Car</Text>

      {/* Image upload code here ... */}

         <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
          <Ionicons name="camera-outline" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Upload Images</Text>
        </TouchableOpacity>
        <FlatList
          data={carImages}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Car Name</Text>
        <TextInput style={styles.input} placeholder="Enter car name" value={carName} onChangeText={setCarName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Model</Text>
        <TextInput style={styles.input} placeholder="Enter car model" value={carModel} onChangeText={setCarModel} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Enter car address" value={carAddress} onChangeText={setCarAddress} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input} placeholder="Enter car price" value={carPrice} onChangeText={setCarPrice} keyboardType="numeric" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.descriptionInput]} placeholder="Enter car description" value={carDescription} onChangeText={setCarDescription} multiline />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Specifications</Text>
        <TextInput style={[styles.input, styles.descriptionInput]} placeholder="Enter car specifications" value={carSpecifications} onChangeText={setCarSpecifications} multiline />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seats</Text>
        <TextInput style={styles.input} placeholder="Enter number of seats" value={carSeats} onChangeText={setCarSeats} keyboardType="numeric" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Car Type</Text>
        <TextInput style={styles.input} placeholder="Enter car type" value={carType} onChangeText={setCarType} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Transmission</Text>
        <TextInput style={styles.input} placeholder="Enter transmission type" value={carTransmission} onChangeText={setCarTransmission} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Delivery Type</Text>
        <TextInput style={styles.input} placeholder="Enter delivery type" value={carDeliveryType} onChangeText={setCarDeliveryType} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Date</Text>
        <TextInput style={styles.input} placeholder="Enter start date" value={startDate} onChangeText={setStartDate} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Date</Text>
        <TextInput style={styles.input} placeholder="Enter end date" value={endDate} onChangeText={setEndDate} />
      </View>

    
    </ScrollView>
    <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
        <Text style={styles.addButtonText}>Add Car</Text>
      </TouchableOpacity>
  </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({

  ScrollViewcontainer:{
    backgroundColor: '#101821',
    padding: 20,
    flexGrow: 1,

    paddingBottom: 80,
  },
  container: {
    backgroundColor: '#101821',
    padding: 20,
    flexGrow: 1,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageCarousel: {
    marginBottom: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4AB4D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#1E2D3E',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#F4AB4D',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});


export default AddCarScreen;
