import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LocationScreen = () => {
  // Our protagonist's trusty sidekicks
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressList, setAddressList] = useState([]);

  // The hero's quest to search for addresses
  const handleAddressSearch = async (text) => {
    try {
      // The almighty Axios fetches the mystical address suggestions
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=533cf13c58da4662a3cb1f4389021a78`);
      setAddressList(response.data.features.map(item => item.properties.formatted));
    } catch (error) {
      console.log("ERROR" + error);
    }
  };

  // The hero's noble selection of an address
  const handleAddressSelection = (address) => {
    
    setSelectedAddress(address);
  };

  // The ultimate moment when the hero confirms the chosen address and moves on!
  const handleConfirmAddress = () => {
    navigation.navigate('HomeScreen', { selectedAddress });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* The hero's header - noble and bold */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F4AB4D" />
        </TouchableOpacity>
        <Text style={styles.title}>Enter Delivery Address</Text>
      </View>

      {/* The quest for the address begins with the search container */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#8F8F8F" />
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          onChangeText={handleAddressSearch}
          value={selectedAddress}
        />
        {/* The address suggestions reveal themselves to the hero */}
       
      </View>
      <View style={styles.dropdownContainer}>

      {addressList.map((address, index) => (
          <Text

          style={styles.dropdownText}
          key={index} onPress={() => handleAddressSelection(address)}>{address}</Text>
        ))}
      </View>
      {/* The hero's final step - confirming the chosen address */}
      <TouchableOpacity onPress={handleConfirmAddress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Confirm Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4AB4D',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#F4AB4D',
    marginHorizontal: 32,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  dropdownContainer: {
   
    borderRadius: 8,
    elevation: 4,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default LocationScreen;
