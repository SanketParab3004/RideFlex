import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite'; 
import { SafeAreaView } from 'react-native';

const OwnerHome = ({ route, navigation }) => {

  const db = SQLite.openDatabase('user_db');
  const userId = route.params?.userId;
  const [carList, setCarList] = useState([]);

  const handleAddCar = () => {
    navigation.navigate('AddCarScreen' , {userId : userId});
  };

  const handleEditCar = (carId) => {
    navigation.navigate('EditCarScreen', { carId });
  };

  const handleUserProfilePress = () => {
    // Navigate to user profile screen
    navigation.navigate('OwnerUserProfileScreen');
  };

  useEffect(() => {
    getCarsFromDatabase();
  }, []);

  const getCarsFromDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cars',
        [],
        (_, result) => {
          setCarList(result.rows._array);
        },
        (_, error) => {
          console.error('Error fetching cars data:', error);
        }
      );
    });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carItem}
      onPress={() => handleEditCar(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={24} color="white" onPress={handleUserProfilePress} />
        <Text style={styles.logoText}>RideFlex</Text>
        <Text></Text>
      </View>

      <FlatList
        data={carList}
        keyExtractor={(item) => item.id.toString()} // Use toString() to avoid key warning
        renderItem={renderItem}
        contentContainerStyle={styles.carListContainer}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
        <Ionicons name="add-circle" size={36} color="white" />
        <Text style={styles.addButtonText}>Add Car</Text>
      </TouchableOpacity>
    </SafeAreaView>
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

export default OwnerHome;
