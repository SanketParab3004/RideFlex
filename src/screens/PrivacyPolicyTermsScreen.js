import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyTermsScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy and Terms</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <Text style={styles.sectionText}>
          This is the privacy policy text. It explains how user data is collected, used, and protected.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor felis ut scelerisque. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
          Suspendisse potenti. Nulla facilisi. Fusce venenatis ex eu malesuada.
        </Text>

        <Text style={styles.sectionTitle}>Terms of Service</Text>
        <Text style={styles.sectionText}>
          These are the terms of service. It outlines the rules and guidelines for using the application.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor felis ut scelerisque. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
          Suspendisse potenti. Nulla facilisi. Fusce venenatis ex eu malesuada.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E2D3E',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 20,
  },
});

export default PrivacyPolicyTermsScreen;
