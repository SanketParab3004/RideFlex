import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PreviouslyRentedCarsScreen = () => {
  const navigation = useNavigation();

  const rentedCars = [
    {
      id: '1',
      carName: 'Toyota Corolla',
      rentalDate: '2023-07-01',
      returnDate: '2023-07-05',
      carImage: require('../../assets/images/1.jpg'),
    },
    {
      id: '2',
      carName: 'Honda Civic',
      rentalDate: '2023-07-10',
      returnDate: '2023-07-15',
      carImage: require('../../assets/images/2.jpg'),
    },
    // Add more rented cars as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.carItem}>
      <Image source={item.carImage} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{item.carName}</Text>
        <Text style={styles.rentalDate}>Rental Date: {item.rentalDate}</Text>
        <Text style={styles.returnDate}>Return Date: {item.returnDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Previously Rented Cars</Text>
      </View>
      <FlatList
        data={rentedCars}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E2D3E',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 20,
  },
  carItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  rentalDate: {
    fontSize: 14,
    color: 'white',
  },
  returnDate: {
    fontSize: 14,
    color: 'white',
  },
});

export default PreviouslyRentedCarsScreen;
