import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const TotalEarningsScreen = () => {
  // Replace this with the actual earnings data
  const earningsData = [
    {
      id: '1',
      date: '2023-06-01',
      amount: 500,
      tax: 50,
      serviceCharge: 20,
    },
    {
      id: '2',
      date: '2023-06-10',
      amount: 750,
      tax: 75,
      serviceCharge: 30,
    },
    // Add more earnings data here
  ];

  const totalEarnings = earningsData.reduce((total, item) => total + item.amount, 0);
  const totalTax = earningsData.reduce((total, item) => total + item.tax, 0);
  const totalServiceCharge = earningsData.reduce((total, item) => total + item.serviceCharge, 0);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Total Earnings</Text>
      </View>

      <Text style={styles.totalAmount}>Total Amount Earned: ${totalEarnings}</Text>

      <Text style={styles.subTitle}>Earnings for Last Month:</Text>
      <FlatList
        data={earningsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.earningItem}>
            <Text style={styles.earningDate}>{item.date}</Text>
            <Text style={styles.earningAmount}>Earnings: ${item.amount}</Text>
            <Text style={styles.earningDetails}>
              Tax: ${item.tax} | Service Charge: ${item.serviceCharge}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.earningsList}
      />

      <View style={styles.breakdown}>
        <Text style={styles.breakdownLabel}>Breakdown:</Text>
        <Text style={styles.breakdownDetails}>
          Total Tax: ${totalTax} | Total Service Charge: ${totalServiceCharge}
        </Text>
      </View>
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
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#1E2D3E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4AB4D',
    marginVertical: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginLeft: 20,
  },
  earningsList: {
    paddingHorizontal: 20,
  },
  earningItem: {
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    paddingVertical: 15,
  },
  earningDate: {
    fontSize: 14,
    color: '#F4AB4D',
    marginBottom: 5,
  },
  earningAmount: {
    fontSize: 16,
    color: 'white',
    marginBottom: 2,
  },
  earningDetails: {
    fontSize: 14,
    color: 'white',
  },
  breakdown: {
    marginTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
    paddingTop: 10,
  },
  breakdownLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  breakdownDetails: {
    fontSize: 16,
    color: 'white',
  },
});

export default TotalEarningsScreen;
