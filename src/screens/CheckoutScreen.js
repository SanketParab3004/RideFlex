import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const CheckoutScreen = ({ navigation }) => {
  const route = useRoute();
  const { carDetails, ownerName } = route.params;
    console.log(carDetails);

    const calculateTotalAmount = (price) => {
      const hourlyRate = price;
      const hours = 5; // Consider retrieving this dynamically
      const taxRate = 0.1;
      const serviceCharge = 5;
      
      const totalRent = hourlyRate * hours;
      const tax = totalRent * taxRate;
    
      return totalRent + tax + serviceCharge;
    };

  const handleCheckout = () => {
    const totalAmount = calculateTotalAmount(carDetails.price);

  
    navigation.navigate('PaymentScreen', { totalAmount });

  };

  const renderSpecifications = () => {
    return JSON.parse(carDetails.specifications).map((spec, index) => (
      <View key={index} style={styles.additionalInfoItem}>
        <Text style={styles.additionalInfoValue}>{spec}</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Car details section */}
        <View style={styles.cardContainer}>
          <View style={styles.card_carinfo}>
            <Image source={JSON.parse(carDetails.images)[0]} style={styles.carImage} />
            <View style={styles.carInfoContainer}>
              <Text style={styles.carName}>{carDetails.name}</Text>
              <Text style={styles.ownerName}>Owner: {ownerName}</Text>
            </View>
          </View>
        </View>

        {/* Timeline section */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.timelineContainer}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineBulletContainer}>
                  <View style={styles.timelineBulletStart} />
                  <View style={styles.timelineLine} />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timeline_StartDate_Label}>Start Date</Text>
                  <Text style={styles.timelineValue}>July 12, 2023, 9:45 A.M.</Text>
                </View>
              </View>
              <View style={styles.timelineItem}>
                <View style={styles.timelineBulletContainer}>
                  <View style={styles.timelineBulletEnd} />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timeline_EndtDate_Label}>End Date</Text>
                  <Text style={styles.timelineValue}>July 14, 2023, 11:45 P.M.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Additional information card */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.additionalInfoContainer}>
            {renderSpecifications()}

            </View>
          </View>
        </View>

        {/* Price section */}
        <View style={[styles.cardContainer, styles.priceSection]}>
          <View style={styles.card}>
          <View style={styles.priceContainer}>
  <Text style={styles.priceItemLabel}>Hourly Rate</Text>
  <Text style={styles.priceItemValue}>${carDetails.price}</Text>
  <Text style={styles.priceItemLabel}>Total Number of Hours</Text>
  <Text style={styles.priceItemValue}>5 hours</Text>
  <Text style={styles.priceItemLabel}>Total Rent</Text>
  <Text style={styles.priceItemValue}>${carDetails.price * 5}</Text>
  <Text style={styles.priceItemLabel}>+ Tax</Text>
  <Text style={styles.priceItemValue}>${(carDetails.price * 5) * 0.1}</Text>
  <Text style={styles.priceItemLabel}>+ Service Charge</Text>
  <Text style={styles.priceItemValue}>$5</Text>
  <Text style={[styles.priceItemLabel, styles.totalAmountLabel]}>Total Amount</Text>
  <Text style={[styles.priceItemValue, styles.totalAmountValue]}>${(carDetails.price * 5) + (carDetails.price * 5) * 0.1 + 5}</Text>
</View>

          </View>
        </View>

        {/* Space */}
        <View style={styles.space} />

      </ScrollView>

      {/* Checkout button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardContainer: {
    marginTop: 24,
  },

  card_carinfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 16,
  },
  carImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 16,
  },
  carInfoContainer: {
    flex: 1,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    marginLeft: 16,
  },
  ownerName: {
    fontSize: 16,
    marginLeft: 16,
    color: '#EFEEEF',
  },
  timelineContainer: {
    marginTop: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timelineBulletContainer: {
    marginRight: 12,
  },
  timelineBulletStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6AD730',
    backgroundColor: '#F4AB4D',
  },
  timelineBulletEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#F44237',
    backgroundColor: '#F4AB4D',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#F4AB4D',
    marginLeft: 5,
  },
  timelineContent: {
    flex: 1,
  },
  timeline_StartDate_Label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6AD730',
  },

  timeline_EndtDate_Label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44237',
  },

  timelineValue: {
    fontSize: 16,
    color: '#EFEEEF',
  },
  additionalInfoContainer: {
    marginTop: 16,
  },
  additionalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  additionalInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'white',
  },
  additionalInfoValue: {
    fontSize: 16,
    color: '#EFEEEF',
  },
  priceSection: {
    marginTop: 24,
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceItemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'white',
  },
  priceItemValue: {
    fontSize: 16,
    color: '#EFEEEF',
    marginBottom: 8,
  },
  totalAmountLabel: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#F4AB4D',
  },
  totalAmountValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  space: {
    height: 80,
  },
  checkoutButton: {
    backgroundColor: '#F4AB4D',
    borderRadius: 10,
    paddingVertical: 12,
    margin: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default CheckoutScreen;
