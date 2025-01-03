import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); 

  const totalAmount = route.params?.totalAmount || 'N/A';

  const [selectedOption, setSelectedOption] = useState('');

  const handlePayment = (option) => {
    setSelectedOption(option);
    // Implement your payment logic for the selected option
    console.log(`Payment method selected: ${option}`);
  };

  const renderCardDisplay = () => {
    const cardNumber = '1234567890123456'; // Replace with the actual card number
    const maskedCardNumber = `**** **** **** ${cardNumber.slice(-4)}`;
    return (
      <View style={styles.cardDisplay}>
        <Text style={styles.cardDisplayText}>{`Card: ${maskedCardNumber}`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'addCard' && styles.selectedOption]}
          onPress={() => handlePayment('addCard')}
        >
          <Ionicons name="add-outline" size={24} color="#F4AB4D" />
          <Text style={styles.optionText}>Add New Card</Text>
        </TouchableOpacity>

        {selectedOption === 'addCard' && renderCardDisplay()}

        <TouchableOpacity
          style={[styles.option, selectedOption === 'applePay' && styles.selectedOption]}
          onPress={() => handlePayment('applePay')}
        >
          <Ionicons name="logo-apple" size={24} color="#F4AB4D" />
          <Text style={styles.optionText}>Apple Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selectedOption === '#F4AB4D' && styles.selectedOption]}
          onPress={() => handlePayment('googlePay')}
        >
          <Ionicons name="logo-google" size={24} color="#F4AB4D" />
          <Text style={styles.optionText}>Google Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selectedOption === 'cash' && styles.selectedOption]}
          onPress={() => handlePayment('cash')}
        >
          <Ionicons name="cash-outline" size={24} color="#F4AB4D" />
          <Text style={styles.optionText}>Cash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalAmount}>{`$${totalAmount}`}</Text>
      </View>

      <TouchableOpacity style={styles.applyCouponButton} onPress={() => console.log('Apply Coupon button pressed')}>
        <Text style={styles.applyCouponButtonText}>Apply Coupon</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.payButton} onPress={() => 
        navigation.navigate('HomeScreen')}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4AB4D',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  optionContainer: {
    marginTop: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#F4AB4D',
    borderRadius: 10,
    marginBottom: 20,
  },
  selectedOption: {
    backgroundColor: '#F4AB4D',
    borderColor: '#F4AB4D',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#F4AB4D',
  },
  cardDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
    marginBottom: 10,
  },
  cardDisplayText: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#F4AB4D',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4AB4D',
  },
  applyCouponButton: {
    backgroundColor: '#F4AB4D',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  applyCouponButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101821',
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: '#F4AB4D',
    borderRadius: 10,
    paddingVertical: 12,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101821',
    textAlign: 'center',
  },
});

export default PaymentScreen;
