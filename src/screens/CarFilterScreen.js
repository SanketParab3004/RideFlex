import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const CarFilterScreen = () => {
  
  const navigation = useNavigation();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedDeliveryTypes, setSelectedDeliveryTypes] = useState([]);

  const seatsOptions = [
    { id: 1, label: '2 Seats' },
    { id: 2, label: '4 Seats' },
    { id: 3, label: '5 Seats' },
    { id: 4, label: '7 Seats' },
  ];

  const carTypesOptions = [
    { id: 1, label: 'Sedan' },
    { id: 2, label: 'SUV' },
    { id: 3, label: 'Convertible' },
    { id: 4, label: 'Luxury' },
  ];

  const transmissionsOptions = [
    { id: 1, label: 'Automatic' },
    { id: 2, label: 'Manual' },
  ];

  const deliveryTypesOptions = [
    { id: 1, label: 'Pick-up' },
    { id: 2, label: 'Drop-off' },
    { id: 3, label: 'Both' },
  ];

  const handleSeatSelection = (id) => {
    const selectedSeat = seatsOptions.find((option) => option.id === id);
    if (!selectedSeat) return; // Handle invalid id
  
    const isSelected = selectedSeats.some((seat) => seat.id === id);
    const updatedSelection = isSelected
      ? selectedSeats.filter((seat) => seat.id !== id)
      : [...selectedSeats, selectedSeat.label]; // Store label instead of id
    setSelectedSeats(updatedSelection);
  };
  
  const handleCarTypeSelection = (id) => {
    const selectedCarType = carTypesOptions.find((option) => option.id === id);
    if (!selectedCarType) return; // Handle invalid id
  
    const isSelected = selectedCarTypes.some((carType) => carType.id === id);
    const updatedSelection = isSelected
      ? selectedCarTypes.filter((carType) => carType.id !== id)
      : [...selectedCarTypes, selectedCarType.label]; // Store label instead of id
    setSelectedCarTypes(updatedSelection);
  };
  
  const handleTransmissionSelection = (id) => {
    const selectedTransmission = transmissionsOptions.find(
      (option) => option.id === id
    );
    if (!selectedTransmission) return; // Handle invalid id
  
    const isSelected = selectedTransmissions.some(
      (transmission) => transmission.id === id
    );
    const updatedSelection = isSelected
      ? selectedTransmissions.filter((transmission) => transmission.id !== id)
      : [...selectedTransmissions, selectedTransmission.label]; // Store label instead of id
    setSelectedTransmissions(updatedSelection);
  };
  
  const handleDeliveryTypeSelection = (id) => {
    const selectedDeliveryType = deliveryTypesOptions.find(
      (option) => option.id === id
    );
    if (!selectedDeliveryType) return; // Handle invalid id
  
    const isSelected = selectedDeliveryTypes.some(
      (deliveryType) => deliveryType.id === id
    );
    const updatedSelection = isSelected
      ? selectedDeliveryTypes.filter((deliveryType) => deliveryType.id !== id)
      : [...selectedDeliveryTypes, selectedDeliveryType.label]; // Store label instead of id
    setSelectedDeliveryTypes(updatedSelection);
  };
  

  const handleClearFilter = () => {
    setSelectedSeats([]);
    setSelectedCarTypes([]);
    setSelectedTransmissions([]);
    setSelectedDeliveryTypes([]);
  };

  const handleApplyFilter = () => {
    filters = {"selectedCarTypes":selectedCarTypes, "selectedDeliveryTypes":selectedDeliveryTypes, "selectedSeats":selectedSeats, "selectedTransmissions":selectedTransmissions};
    navigation.navigate("FindCarsScreen" , {"filters":filters});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Car Filter</Text>
      </View>

      <ScrollView style={styles.optionsContainer}>
        <View style={styles.optionGroup}>
          <Text style={styles.optionTitle}>Number of Seats</Text>
          {seatsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedSeats.includes(option.id) && styles.optionButtonSelected,
              ]}
              onPress={() => handleSeatSelection(option.id)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedSeats.includes(option.id) && styles.optionButtonTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.optionGroup}>
          <Text style={styles.optionTitle}>Car Type</Text>
          {carTypesOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedCarTypes.includes(option.id) && styles.optionButtonSelected,
              ]}
              onPress={() => handleCarTypeSelection(option.id)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedCarTypes.includes(option.id) && styles.optionButtonTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.optionGroup}>
          <Text style={styles.optionTitle}>Transmission</Text>
          {transmissionsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedTransmissions.includes(option.id) && styles.optionButtonSelected,
              ]}
              onPress={() => handleTransmissionSelection(option.id)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedTransmissions.includes(option.id) && styles.optionButtonTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.optionGroup}>
          <Text style={styles.optionTitle}>Delivery Type</Text>
          {deliveryTypesOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedDeliveryTypes.includes(option.id) && styles.optionButtonSelected,
              ]}
              onPress={() => handleDeliveryTypeSelection(option.id)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedDeliveryTypes.includes(option.id) && styles.optionButtonTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearFilter}>
          <Text style={styles.clearButtonText}>Clear Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4AB4D',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 1,
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  optionGroup: {
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F4AB4D',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  optionButtonSelected: {
    backgroundColor: '#F4AB4D',
    borderColor: '#F4AB4D',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  optionButtonTextSelected: {
    color: '#101821',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
  },
  applyButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#F4AB4D',
    borderRadius: 10,
    paddingVertical: 12,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101821',
    textAlign: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default CarFilterScreen;
