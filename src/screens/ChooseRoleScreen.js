// screens/ChooseRoleScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ChooseRoleScreen = ({ navigation }) => {
  const handleRenterLogin = () => {
    // Navigate to Renter Login screen and pass role as 'renter'
    navigation.navigate('RenterLoginScreen', { role: 'renter' });
  };

  const handleOwnerLogin = () => {
    // Navigate to Car Owner Login screen and pass role as 'car_owner'
    navigation.navigate('CarOwnerLoginScreen', { role: 'car_owner' });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/banner-moc-5-1.png')} style={styles.logo} />
      <Text style={styles.title}>Choose Your Role</Text>
      <TouchableOpacity style={styles.roleButton} onPress={handleRenterLogin}>
        <Text style={styles.buttonText}>Login as Car Renter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.roleButton} onPress={handleOwnerLogin}>
        <Text style={styles.buttonText}>Login as Car Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4AB4D',
    marginBottom: 40,
  },
  roleButton: {
    backgroundColor: '#F4AB4D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ChooseRoleScreen;
