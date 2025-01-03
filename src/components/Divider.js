import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/CommonStyles';

export default function Divider() {
  return (
    <View style={commonStyles.dividerContainer}>
      <View style={commonStyles.dividerLine} />
      <Text style={commonStyles.dividerText}>OR</Text>
      <View style={commonStyles.dividerLine} />
    </View>
  );
}
