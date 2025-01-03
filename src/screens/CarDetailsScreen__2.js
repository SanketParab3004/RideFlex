import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const CarDetailsScreen = () => {
  const car = {
    name: 'BMW',
    images: [
      require('../../assets/images/1.jpg'),
      require('../../assets/images/2.jpg'),
      require('../../assets/images/3.jpg'),
    ],
    owner: 'John Doe',
    model: 'X5',
    company: 'BMW',
    specifications: ['4 seater', 'sunroof', 'SUV', 'Bluetooth connectivity', 'Advanced safety features'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$50 per day', // Add the price for the car here
    location: 'Car Location Address', // Replace with the actual car location address
    latitude: 37.78825, // Replace with the actual latitude
    longitude: -122.4324, // Replace with the actual longitude
  };

  const renderImages = () => {
    return car.images.map((image, index) => (
      <View key={index} style={styles.imageContainer}>
        <Image source={image} style={styles.carImage} />
      </View>
    ));
  };

  const handleRideNow = () => {
    console.log('Ride Now button pressed');
    // Add your logic here for Ride Now action
  };

  const openMapsApp = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${car.latitude},${car.longitude}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Hamburger icon pressed')}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.logoText}>RideFlex</Text>
        <TouchableOpacity onPress={() => console.log('Bookmark icon pressed')}>
          <Ionicons name="bookmark-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.carName}>{car.name}</Text>

        <ScrollView horizontal={true} style={styles.imageScrollView}>
          {renderImages()}
        </ScrollView>

        <Text style={styles.sectionTitle}>Owner's Name:</Text>
        <Text style={styles.text}>{car.owner}</Text>

        <Text style={styles.sectionTitle}>Car Model and Company:</Text>
        <Text style={styles.text}>
          {car.model} - {car.company}
        </Text>

        <Text style={styles.sectionTitle}>Specifications:</Text>
        <View style={styles.specificationsContainer}>
          {car.specifications.map((specification, index) => (
            <Text key={index} style={[styles.specification, { fontSize: 14 + Math.min(specification.length, 1) }]}>
              {specification}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Description:</Text>
        <Text style={styles.text}>{car.description}</Text>

        <TouchableOpacity style={styles.mapContainer} onPress={openMapsApp}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: car.latitude,
              longitude: car.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider="google"
            customMapStyle={[]}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: car.latitude,
                longitude: car.longitude,
              }}
              title="Car Location"
              description={car.location}
            />
          </MapView>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{car.price}</Text>
        </View>
        <TouchableOpacity style={styles.rideNowButton} onPress={handleRideNow}>
          <Text style={styles.rideNowButtonText}>Ride Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101821',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#101821',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  carName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#F4AB4D',
  },
  imageScrollView: {
    marginBottom: 16,
  },
  imageContainer: {
    marginRight: 10,
  },
  carImage: {
    width: 250,
    height: 180,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#F4AB4D',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  specificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  specification: {
    backgroundColor: '#F4AB4D',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    color: 'white',
    fontSize: 16,
  },
  mapContainer: {
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    backgroundColor: '#101821',
  },
  priceContainer: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  rideNowButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#F4AB4D',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  rideNowButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default CarDetailsScreen;
