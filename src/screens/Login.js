import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/CommonStyles';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import { users } from '../data/users';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('user_db'); 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = () => {

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            navigation.navigate('HomeScreen');
          } else {
            Alert.alert('Error', 'Authentication Error');
          }
        },
        (tx, error) => console.log('Login Error:', error)
      );
    });

  

  };

  // const handleLogin = () => {
  //   let loggedin = false;
  //   //console.log(users);
  //   for(let i=0; i<users.length; i++)
  //   {
  //     if(users[i].email == email && users[i].password == password)
  //     {
  //       loggedin = true;
  //       navigation.navigate('HomeScreen');
  //       break;
  //     }
  //   }

  //   if(loggedin == false)
  //   {
  //     Alert.alert('Error', 'Authentication Error');
  //   }
  // };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={commonStyles.container}>
        <Logo />
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Login" onPress={handleLogin} />

        <Divider />

        <View style={commonStyles.singuploginLine}>
          <Text style={commonStyles.bottomtext}>
            Don't have an account?{' '}
            <TouchableOpacity
              onPress={handleLogin}
              style={commonStyles.signUpText}
            >
              <Text style={commonStyles.signUpLink} onPress={() => navigation.navigate("Signup")}>Sign up here</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
