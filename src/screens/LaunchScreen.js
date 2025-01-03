import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LaunchScreen = ({ navigation }) => {
  useEffect(() => {
      const timeout = setTimeout(() => {

      navigation.navigate('ChooseRoleScreen');

    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/RideFlex.gif')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101821',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});

export default LaunchScreen;