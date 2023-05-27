import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      //   navigation.replace('Home');
    }, 3000);
  }, []);

  return (
    <View style={ContainerStyle.container}>
      <Image source={require('../assets/musicify.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});

export default SplashScreen;
