import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListedCarsScreen = ({ navigation }) => {
  // Replace this with the actual list of cars listed by the car owner
  const [carList, setCarList] = useState([
    {
        id: '1',
        name: 'BMW X5',
        image: require('../../assets/images/1.jpg'),
        status: 'Available',
        images: [
          require('../../assets/images/1.jpg'),
          require('../../assets/images/2.jpg'),
          require('../../assets/images/3.jpg'),
        ],
        owner: 'John Doe',
        model: 'X5',
        company: 'BMW',
        specifications: [
          '4 seater',
          'sunroof',
          'SUV',
          'Bluetooth connectivity',
          'Advanced safety features',
        ],
        description: 'Luxury SUV with advanced features.',
        price: '$50',
      },
      {
        id: '2',
        name: 'Honda Civic',
        image: require('../../assets/images/2.jpg'),
        status: 'Rented',
        images: [
          require('../../assets/images/1.jpg'),
          require('../../assets/images/2.jpg'),
          require('../../assets/images/3.jpg'),
        ],
        owner: 'Alice Smith',
        model: 'Civic',
        company: 'Honda',
        specifications: [
          '5 seater',
          'compact',
          'Fuel-efficient',
          'Reliable',
        ],
        description: 'Efficient and reliable compact car.',
        price: '$35',
      },
      {
        id: '3',
        name: 'Nissan Altima',
        image: require('../../assets/images/3.jpg'),
        status: 'Available',
        images: [
          require('../../assets/images/1.jpg'),
          require('../../assets/images/2.jpg'),
          require('../../assets/images/3.jpg'),
        ],
        owner: 'Michael Johnson',
        model: 'Altima',
        company: 'Nissan',
        specifications: [
          '5 seater',
          'sedan',
          'Comfortable',
          'Modern design',
        ],
        description: 'Modern and comfortable sedan.',
        price: '$40',
      },
    // Add more cars as needed
  ]);


  const handleEditCar = (car) => {
    navigation.navigate('EditCarScreen', { car });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carItem}
      onPress={() => handleEditCar(item)}
    >
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>RideFlex</Text>
        <Text></Text>
      </View>

      <FlatList
        data={carList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.carListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
  },

  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  
  carListContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  carItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E2D3E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  carInfo: {
    flex: 1,
    marginLeft: 10,
  },
  carName: {
    fontSize: 18,
    color: 'white',
  },
  carStatus: {
    fontSize: 16,
    color: '#F4AB4D',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4AB4D',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
});

export default ListedCarsScreen;
