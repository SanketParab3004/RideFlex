import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomerSupportScreen = () => {
  const navigation = useNavigation();
  const [IssueDescription, setIssueDescription] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCallHelpline = () => {
    // Replace '1234567890' with the actual helpline number
    Linking.openURL('tel:1234567890');
  };

  const handleReportIssue = () => {
    // Implement your logic to report the Issue here
    // This could involve sending the Issue description to a server
    // For demonstration purposes, we'll just log the Issue description
    console.log('Issue Description:', IssueDescription);
    setIssueDescription('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Customer Support</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Report a Issue</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe the Issue you faced"
          value={IssueDescription}
          onChangeText={setIssueDescription}
          multiline
        />
        <TouchableOpacity style={styles.reportButton} onPress={handleReportIssue}>
          <Text style={styles.reportButtonText}>Report Issue</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity style={styles.callTextContainer} onPress={handleCallHelpline}>
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.callText}>Call 24/7 Helpline</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1E2D3E',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    padding: 10,
    color: 'white',
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  reportButton: {
    backgroundColor: '#F4AB4D',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  orText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 15,
  },
  callTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomerSupportScreen;
