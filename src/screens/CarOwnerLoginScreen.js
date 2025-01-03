// screens/CarOwnerLoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user_db'); 

const CarOwnerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLogin = () => {
    console.log("handleLogin");
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            const id = results.rows.item(0).id;
            console.log(id);
            navigation.navigate('OwnerHome' , {userId : id});
          } else {
            Alert.alert('Error', 'Authentication Error');
          }
        },
        (tx, error) => console.log('Login Error:', error)
      );
    });
  };

  const handleCreateAccount = () => {
    // Navigate to the car owner create account screen
    navigation.navigate('CarOwnerCreateAccountScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/banner-moc-5-1.png')} style={styles.logo} />
      <Text style={styles.title}>Car Owner Login</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.createAccountButtonText}>Don't have an account? Create one</Text>
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
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#F4AB4D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  createAccountButton: {
    marginBottom: 20,
  },
  createAccountButtonText: {
    fontSize: 16,
    color: '#F4AB4D',
  },
});

export default CarOwnerLoginScreen;
