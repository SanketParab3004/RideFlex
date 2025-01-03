import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = ({ route }) => {


  const startDate = route.params?.startDate;
  const endDate = route.params?.endDate;
  const pickupTime = route.params?.pickupTime;
  const dropOffTime = route.params?.dropOffTime;

  let selectedAddress = route.params?.selectedAddress;

  selectedAddress = "35 Forest Drive, St. Albert, AB, Canada";

  const basicFilters = {
    "startDate":startDate,
    "endDate":endDate,
    "pickupTime":pickupTime,
    "dropOffTime":dropOffTime,
    "selectedAddress":selectedAddress
  };

  const navigation = useNavigation();
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleAddressInputPress = () => {
    navigation.navigate('LocationScreen');
  };

  const handlePickUpDropDetailsPress = () => {
    navigation.navigate('DateSelectionScreen');
  };

  const handleUserProfilePress = () => {
    // Navigate to user profile screen
    navigation.navigate('RenterUserProfileScreen');
  };


  return (
  

    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={24} color="white" onPress={handleUserProfilePress} />
        <Text style={styles.logoText}>RideFlex</Text>
        <Text></Text>
      </View>

      <View style={styles.doodleContainer}>
        <Image source={require('../../assets/images/banner-moc-5-1.png')} style={styles.doodleImage} />
      </View>

      <TouchableOpacity
        style={styles.addressInputContainer}
        onPress={handleAddressInputPress}
      >
  <Text style={styles.addressInputLabel}>
    {selectedAddress ? selectedAddress : 'Enter your address'}
  </Text>
  <Ionicons name="location-outline" size={24} color="#8C8C8C" />
</TouchableOpacity>

      {startDate && endDate && pickupTime && dropOffTime ? (
        <TouchableOpacity style={styles.pickupDropDetailsContainer} onPress={handlePickUpDropDetailsPress}>
          <Text style={styles.pickupDropDetailsLabel}>
            {`Start Date: ${startDate}\nEnd Date: ${endDate}\nPickup Time: ${pickupTime}\nDrop Off Time: ${dropOffTime}`}
          </Text>
          <Ionicons name="calendar-outline" size={24} color="#8C8C8C" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.pickupDropDetailsContainer} onPress={handlePickUpDropDetailsPress}>
          <Text style={styles.pickupDropDetailsLabel}>Enter Pick Up and Drop Details</Text>
          <Ionicons name="calendar-outline" size={24} color="#8C8C8C" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('FindCarsScreen' , {"basicFilters":basicFilters})}
        style={[styles.findCarsButton, buttonPressed ? styles.findCarsButtonPressed : null]}
        onPressIn={() => setButtonPressed(true)}
        onPressOut={() => setButtonPressed(false)}
      >
        <Text style={styles.findCarsButtonText}>Find Cars</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doodleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  doodleImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
  },
  addressInputLabel: {
    fontSize: 16,
    color: '#8C8C8C',
  },
  pickupDropDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
  },
  pickupDropDetailsLabel: {
    fontSize: 16,
    color: '#8C8C8C',
  },
  findCarsButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: '#F4AB4D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  findCarsButtonPressed: {
    backgroundColor: '#f09724',
  },
  findCarsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
