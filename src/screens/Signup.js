import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import { commonStyles } from '../styles/CommonStyles';
import { Alert } from 'react-native';
import { users } from '../data/users';
import User from '../data/UserClass';
import * as SQLite from 'expo-sqlite';
import { KeyboardAvoidingView } from 'react-native-web';

export let randomnum;
const db = SQLite.openDatabase('user_db'); // Opening the database


export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigation = useNavigation();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The password and confirm password do not match.');
      return;
    }
    else
    {
      users.push(new User(name , email , number , password));
    }


    const min = 1000; // Minimum value (inclusive)
    const max = 9999; // Maximum value (inclusive)
    randomnum = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomnum);

 db.transaction(tx => {
  // Check for existing username or email
  tx.executeSql(
    'SELECT * FROM users WHERE name = ? OR email = ?',
    [name, email],
    (_, result) => {
      if (result.rows.length > 0) {
        // Duplicate username or email found
        Alert.alert('Error', 'Username or email already exists.');
      } else {
        // No duplicates found, proceed to insert
        tx.executeSql(
          'INSERT INTO users (name, email, number, password) VALUES (?, ?, ?, ?)',
          [name, email, number, password],
          (_, result) => {
            if (result.rowsAffected > 0) {
              // Successfully inserted
              navigation.navigate('VerifyScreen');
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


  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={commonStyles.container}>
        <Logo />

        <InputField
          placeholder="Name"
          icon={<Icon name="user" size={30} color="#F4AB4D" />}
          value={name}
          onChangeText={setName}
        />

        <InputField
          placeholder="Email"
          icon={<Icon name="mail" size={30} color="#F4AB4D" />}
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          placeholder="Number"
          icon={<Icon name="phone" size={30} color="#F4AB4D" />}
          value={number}
          onChangeText={setNumber}
        />

        <InputField
          placeholder="Password"
          secureTextEntry={true}
          icon={<Icon name="key" size={30} color="#F4AB4D" />}
          value={password}
          onChangeText={setPassword}
        />

        <InputField
          placeholder="Confirm Password"
          secureTextEntry={true}
          icon={<Icon name="key" size={30} color="#F4AB4D" />}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button title="Create Account" onPress={handleSignup} />

        <Divider />

        <View style={commonStyles.singuploginLine}>
          <Text style={commonStyles.bottomtext}>
            Already have an account?{' '}
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={commonStyles.signUpText}
            >
              <Text style={commonStyles.signUpLink}>Log in here</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
