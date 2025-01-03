import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user_db'); // Initialize database

const FindCarsScreen = ({ route }) => {
  const [basicFilters, setBasicFilters] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);

  const navigation = useNavigation();

  const address = basicFilters?.selectedAddress;
  const startDate = basicFilters?.startDate;
  const endDate = basicFilters?.endDate;

  const selectedCarTypes = filterData?.selectedCarTypes;
  const selectedDeliveryTypes = filterData?.selectedDeliveryTypes;
  const selectedSeats = filterData?.selectedSeats;
  const selectedTransmissions = filterData?.selectedTransmissions;

  // Fetch cars data from the database
  const getCarsFromDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cars',
        [],
        (_, result) => {
          setCarsData(result.rows._array);
        },
        (_, error) => {
          console.error('Error fetching cars data:', error);
        }
      );
    });
  };

  useEffect(() => {
    getCarsFromDatabase();

    // Set basic filters and filter data if provided through navigation params
    if (route.params?.basicFilters) {
      setBasicFilters(route.params.basicFilters);
    }
    if (route.params?.filters) {
      setFilterData(route.params.filters);
    }
  }, [route.params]);

  // Filter cars based on criteria

  const filteredData = carsData.filter(car => {
   
    return (
      car.startDate <= startDate &&
      car.endDate >= endDate &&
      car.address === address &&
      (!selectedCarTypes || selectedCarTypes.includes(car.carType)) &&
      (!selectedDeliveryTypes || selectedDeliveryTypes.includes(car.deliveryType)) &&
      (!selectedSeats || selectedSeats.includes(car.seats)) &&
      (!selectedTransmissions || selectedTransmissions.includes(car.transmission))
    );
  });

  // Render individual car card
  const renderCard = (item) => {
    console.log("item is here");
    const images = JSON.parse(item.images);
    console.log(images[0]);

    console.log("item");

    console.log(item);
    return (
      <View key={item.id} style={[styles.card, styles.glassmorphicEffect]}>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetailsScreen', item)}
        >
          <Image 
           source={images[0]}
  
            style={styles.cardImage}
          />
          
        </TouchableOpacity>
        <Text style={styles.cardText}>Name: {item.name}</Text>
        <Text style={styles.cardText}>Address: {item.address}</Text>
      </View>
    );
  };
  
  // Handle button press events
  const handleButtonPressIn = () => setButtonPressed(true);
  const handleButtonPressOut = () => setButtonPressed(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.addressText}>{address}</Text>
          <Text style={styles.dateText}>
            {startDate} - {endDate}
          </Text>
        </View>
      </View>
      
      {/* List of filtered cars */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {filteredData.map(renderCard)}
      </ScrollView>
      
      {/* Filter button */}
      <TouchableOpacity
        style={[
          styles.filterButton,
          buttonPressed ? styles.filterButtonPressed : null,
        ]}
        onPress={() => navigation.navigate('CarFilterScreen')}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        activeOpacity={1}
      >
        <MaterialCommunityIcons name="filter-variant" size={24} color="white" />
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F4AB4D',
  },
  dateText: {
    fontSize: 10,
    color: 'white',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: 60,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Existing background color
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  
  cardImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  calendarButton: {
    fontSize: 16,
    color: '#F4AB4D',
    textDecorationLine: 'underline',
  },
  filterButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
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
    margin: 16,
  },
  filterButtonPressed: {
    backgroundColor: '#f09724',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 8,
  },
});

export default FindCarsScreen;
