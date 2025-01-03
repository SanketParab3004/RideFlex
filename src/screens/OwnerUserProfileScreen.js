import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const OwnerUserProfileScreen = ({ navigation }) => {


  const user = {
    fullName: 'Jane Doe',
    profilePicture: require('../../assets/images/Owner.png'), // Replace with the actual image
  };

  const handleEditProfile = () => {
    console.log('Edit Profile');
    navigation.navigate('OwnerUserProfileEditScreen');
  };

  const handleListedCars = () => {
    console.log('Listed Cars');
    navigation.navigate('ListedCarsScreen');
  };

  const handleOrderList = () => {
    console.log('Order List');
    navigation.navigate('OrderListScreen');
  };

  const handleTotalEarnings = () => {
    console.log('Total Earnings');
    navigation.navigate('TotalEarningsScreen');
  };

  const handleCustomerSupport = () => {
    console.log('Customer Support');
    navigation.navigate('CustomerSupportScreen');
  };

  const handlePrivacyPolicyAndTerms = () => {
    console.log('Privacy Policy and Terms');
    navigation.navigate('PrivacyPolicyTermsScreen');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userProfileContainer}>
        <Image source={user.profilePicture} style={styles.profilePicture} />
        <Text style={styles.fullName}>{user.fullName}</Text>
      </View>

      <TouchableOpacity style={styles.optionContainer} onPress={handleEditProfile}>
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

          <TouchableOpacity style={styles.optionContainer} onPress={handleListedCars}>
            <Text style={styles.optionText}>Listed Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={handleOrderList}>
            <Text style={styles.optionText}>Car Orders</Text>
          </TouchableOpacity>
        

          <TouchableOpacity style={styles.optionContainer} onPress={handleTotalEarnings}>
            <Text style={styles.optionText}>Total Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionContainer} onPress={handleCustomerSupport}>
            <Text style={styles.optionText}>Customer Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionContainer} onPress={handlePrivacyPolicyAndTerms}>
            <Text style={styles.optionText}>Privacy Policy and Terms</Text>
          </TouchableOpacity>
        

      <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    padding: 20,
  },
  userProfileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  optionText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
});

export default OwnerUserProfileScreen;
