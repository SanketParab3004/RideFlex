import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';

const EditCarScreen = ({ route }) => {
  const { carId } = route.params;
  const [carName, setCarName] = useState('');
  const [carDescription, setCarDescription] = useState('');

  const [carPrice, setCarPrice] = useState('');
  const [carImages, setCarImages] = useState([]);
  const [carModel, setCarModel] = useState('');
  const [carSeats, setCarSeats] = useState('');
  const [carType, setCarType] = useState('');

  const db = SQLite.openDatabase('user_db');

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cars WHERE id = ?',
        [carId],
        (_, result) => {
          const carData = result.rows.item(0);
          setCarName(carData.name);
          setCarDescription(carData.description);
          setCarPrice(carData.price.toString()); // Convert to string for input value
          setCarImages([...carData.images]);
          setCarModel(carData.model);
          setCarSeats(carData.seats.toString()); // Convert to string for input value
          setCarType(carData.carType);
        },
        (_, error) => {
          console.error('Error fetching car data:', error);
        }
      );
    });
  };

  const handleUpdateCar = () => {
    console.log('Updating car:', carName, carDescription, carPrice, carModel, carSeats, carType);
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCarImages([...carImages, result.uri]);
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


      <ScrollView
       contentContainerStyle={styles.ScrollViewcontainer}>

        <Text style={styles.title}>Edit Car Details</Text>

       
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Car Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter car name"
            value={carName}
            onChangeText={setCarName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter car description"
            value={carDescription}
            onChangeText={setCarDescription}
            multiline
          />
        </View>

     
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter car price"
            value={carPrice}
            onChangeText={setCarPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter car model"
            value={carModel}
            onChangeText={setCarModel}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Seats</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of seats"
            value={carSeats}
            onChangeText={setCarSeats}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Car Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter car type"
            value={carType}
            onChangeText={setCarType}
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateCar}>
          <Text style={styles.updateButtonText}>Update Car</Text>
        </TouchableOpacity>
      </ScrollView>
   
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
  updateButton: {
    backgroundColor: '#F4AB4D',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  updateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EditCarScreen;
