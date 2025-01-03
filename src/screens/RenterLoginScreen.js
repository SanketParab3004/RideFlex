// screens/RenterLoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import { users } from '../data/users';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user_db'); 

const RenterLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     let loggedin = false;
//     //console.log(users);
//     for(let i=0; i<users.length; i++)
//     {
//       if(users[i].emailOrUsername == emailOrUsername && users[i].password == password)
//       {
//         loggedin = true;
//         navigation.navigate('HomeScreen');
//         break;
//       }
//     }

//     if(loggedin == false)
//     {
//       Alert.alert('Error', 'Authentication Error');
//     }
//   };

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            // Perform login logic here with email/username and password
            console.log('Renter login:', email, password);
            // After successful login, you can navigate to the next screen
            navigation.navigate('HomeScreen'); // Replace with the actual dashboard screen for renters
          } else {
            Alert.alert('Error', 'Authentication Error');
          }
        },
        (tx, error) => console.log('Login Error:', error)
      );
    });
  };

  const handleCreateAccount = () => {
    // Navigate to the CreateAccountScreen
    navigation.navigate('RenterCreateAccountScreen'); // Replace with the actual screen for creating a renter account
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/banner-moc-5-1.png')} style={styles.logo} />
      <Text style={styles.title}>Renter Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
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
        <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
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
    color: '#F4AB4D',
  },
  loginButton: {
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
  createAccountButton: {
    marginTop: 10,
  },
  createAccountText: {
    color: '#F4AB4D',
  },
});

export default RenterLoginScreen;
