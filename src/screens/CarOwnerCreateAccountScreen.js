// screens/CarOwnerCreateAccountScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user_db'); 

const CarOwnerCreateAccountScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The password and confirm password do not match.');
      return;
    }
    else
    {
      db.transaction(tx => {
        // Check for existing username or email
        tx.executeSql(
          'SELECT * FROM users WHERE name = ? OR email = ?',
          [fullName, email],
          (_, result) => {
            if (result.rows.length > 0) {
              // Duplicate username or email found
              Alert.alert('Error', 'Username or email already exists.');
            } else {
              // No duplicates found, proceed to insert
              tx.executeSql(
                'INSERT INTO users (name, email, number, password) VALUES (?, ?, ?, ?)',
                [fullName, email, number, password],
                (_, result) => {
                  if (result.rowsAffected > 0) {
                     // Perform create account logic here with user details
                    console.log('Creating car owner account:', fullName, email, password);
                    // After successful account creation, you can navigate to the next screen
                    navigation.navigate('CarOwnerDashboardScreen'); // Replace with the actual dashboard screen for car owners
                  } else {
                    Alert.alert('Error', 'Could not register user.');
                  }
                },
                (_, error) => console.log(error)
              );
            }
          },
          (_, error) => console.log(error)
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/banner-moc-5-1.png')} style={styles.logo} />
      <Text style={styles.title}>Create Car Owner Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Number"
        value={number}
        onChangeText={setNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4AB4D',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#ffffff',
  },
  createAccountButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#F4AB4D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default CarOwnerCreateAccountScreen;
