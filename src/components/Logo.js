import React from 'react';
import { View, Image } from 'react-native';
import { commonStyles } from '../styles/CommonStyles';

export default function Logo() {
  return (
    <View style={commonStyles.imageContainer}>
      <Image source={require('../../assets/images/RideFlex.png')} style={commonStyles.logo} />
    </View>
  );
}