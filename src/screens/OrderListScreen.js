import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const OrderListScreen = () => {
  const navigation = useNavigation();

  const orders = [
    {
      id: '1',
      renter: {
        name: 'John Doe',
        drivingExperience: 5,
        tripStartDate: '2023-07-01',
        tripEndDate: '2023-07-10',
        totalTrips: 10,
        about: 'I love road trips and exploring new places!',
      },
      status: 'Pending',
      profilePic: require('../../assets/images/yo.png'), // Add the image path here
    },
    {
      id: '2',
      renter: {
        name: 'Jane Smith',
        drivingExperience: 3,
        tripStartDate: '2023-07-05',
        tripEndDate: '2023-07-15',
        totalTrips: 8,
        about: 'Adventure seeker and nature lover.',
      },
      status: 'Accepted',
      profilePic: require('../../assets/images/yo.png'), // Add the image path here
    },
    // Add more sample orders as needed
  ];

  const handleViewOrderDetails = (orderId) => {
    const selectedOrder = orders.find(order => order.id === orderId);
    if (selectedOrder) {
      navigation.navigate('OrderDetailsScreen', { renter: selectedOrder.renter });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.title}>Order Details</Text>
      </View>

      <View style={styles.orderListContainer}>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderItemContainer}
            onPress={() => handleViewOrderDetails(order.id)}
          >
            <View style={styles.profilePicContainer}>
              <Image source={order.profilePic} style={styles.profilePic} />
            </View>
            <View style={styles.orderDetailsContainer}>
              <Text style={styles.renterName}>{order.renter.name}</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4AB4D',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 1,
  },
  orderListContainer: {
    padding: 20,
  },
  orderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    backgroundColor: '#1E2D3E',
    padding: 15,
  },
  profilePicContainer: {
    marginRight: 15,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  orderDetailsContainer: {
    flex: 1,
  },
  renterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  orderStatus: {
    fontSize: 16,
    color: '#F4AB4D',
    marginTop: 5,
  },
});

export default OrderListScreen;
