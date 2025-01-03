import React, { useState } from 'react';
import { View, Keyboard, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/CommonStyles';
import { randomnum } from '../screens/Signup';
import { Alert } from 'react-native';

export default function VerifyScreen({ navigation }) {
  const [verificationCode, setVerificationCode] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCodeChange = (index, value) => {
    const newCode = verificationCode.split('');
    newCode[index] = value;
    setVerificationCode(newCode.join(''));
  };

  const verifyCode = () => {
    if(verificationCode == randomnum)
    {
      navigation.navigate('Login');
    }
    else
    {
      navigation.navigate('Login');

      // Alert.alert('Error' , 'Invalid Code');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.verificationText}>
          We have sent your verification code to your email address, this will expire in 30 minutes.
        </Text>

        <View style={[commonStyles.verificationContainer, { paddingTop: 15 }]}>
          <View style={commonStyles.inlineContainer}>
            <TextInput
              style={[commonStyles.input, { fontSize: 30, width: 50, height: 50, textAlign: 'center' }]}
              keyboardType="numeric"
              maxLength={1}
              value={verificationCode[0]}
              onChangeText={(value) => handleCodeChange(0, value)}
            />
          </View>
          <View style={commonStyles.inlineContainer}>
            <TextInput
              style={[commonStyles.input, { fontSize: 30, width: 50, height: 50, textAlign: 'center' }]}
              keyboardType="numeric"
              maxLength={1}
              value={verificationCode[1]}
              onChangeText={(value) => handleCodeChange(1, value)}
            />
          </View>
          <View style={commonStyles.inlineContainer}>
            <TextInput
              style={[commonStyles.input, { fontSize: 30, width: 50, height: 50, textAlign: 'center' }]}
              keyboardType="numeric"
              maxLength={1}
              value={verificationCode[2]}
              onChangeText={(value) => handleCodeChange(2, value)}
            />
          </View>
          <View style={commonStyles.inlineContainer}>
            <TextInput
              style={[commonStyles.input, { fontSize: 30, width: 50, height: 50, textAlign: 'center' }]}
              keyboardType="numeric"
              maxLength={1}
              value={verificationCode[3]}
              onChangeText={(value) => handleCodeChange(3, value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={ verifyCode } style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Verify Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
