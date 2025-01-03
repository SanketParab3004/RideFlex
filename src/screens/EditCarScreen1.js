import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditCarScreen = ({ route }) => {
  // Replace this with the actual car data for the selected car
  const { carData } = route.params;

  const [description, setDescription] = useState(carData.description);
  const [price, setPrice] = useState(carData.price);

  const handleSaveChanges = () => {
    // Handle saving changes to the car details
    console.log('Saved Changes:', description, price);
  };

  const handleHideCar = () => {
    // Handle hiding the car
    console.log('Hide Car');
  };

  const handleDelistCar = () => {
    // Handle delisting the car
    console.log('Delist Car');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={carData.carImage} style={styles.carImage} />
      <View style={styles.carDetailsContainer}>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Car Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.priceInput}
          placeholder="Car Price"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={handleHideCar}>
          <Text style={styles.optionButtonText}>Hide Car</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleDelistCar}>
          <Text style={styles.optionButtonText}>Delist Car</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    padding: 20,
  },
  carImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  carDetailsContainer: {
    marginTop: 20,
  },
  descriptionInput: {
    backgroundColor: '#1E2D3E',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    color: 'white',
  },
  priceInput: {
    backgroundColor: '#1E2D3E',
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#F4AB4D',
    marginTop: 20,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F4AB4D',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EditCarScreen;
