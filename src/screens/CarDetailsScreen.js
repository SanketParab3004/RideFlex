import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, SafeArreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite'

const CarDetailsScreen = ({ route }) => {
  const [ownerName, setOwnerName] = useState(null);

  const db = SQLite.openDatabase('user_db');

  function FindOwnerById(Addedby_id, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE id = ?',
        [Addedby_id],
        (_, result) => {
          const users = result.rows._array;
          console.log('User Found', users[0].name);
          callback(users[0].name); // Call the callback with the result
        },
        (_, error) => {
          console.log('Error fetching users:', error);
        }
      );
    });
  }
  
  FindOwnerById(10, (name) => {
    console.log("FindOwnerById", name); // This will log the name
    setOwnerName(name);
  });
  

  const car = route.params;
console.log("CAR DETAILS");
console.log(car);

  const navigation = useNavigation();

  const renderImages = () => {
    return JSON.parse(car.images).map((image, index) => (
      <View key={index} style={styles.imageContainer}>
        <Image source={image} style={styles.carImage} />
      </View>
    ));
  };

  const handleRideNow = () => {
    navigation.navigate('CheckoutScreen', { carDetails: car, ownerName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.logoText}>RideFlex</Text>
         </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.carName}>{car.name}</Text>

        <ScrollView horizontal={true} style={styles.imageScrollView}>
          {renderImages()}
        </ScrollView>

        <Text style={styles.sectionTitle}>Owner's Name:</Text>
        <Text style={styles.text}>{ownerName}        </Text>

        <Text style={styles.sectionTitle}>Car Model and Company:</Text>
        <Text style={styles.text}>
          {car.model} - {car.name}
        </Text>

        <Text style={styles.sectionTitle}>Specifications:</Text>
        <View style={styles.specificationsContainer}>
          {JSON.parse(car.specifications).map((specification, index) => (
            <Text key={index} style={[styles.specification, { fontSize: 14 + Math.min(specification.length, 1) }]}>
              {specification}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Description:</Text>
        <Text style={styles.text}>{car.description}</Text>
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