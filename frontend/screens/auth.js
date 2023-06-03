import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginComponent from '../components/loginComponent.js';
import SignupComponent from '../components/SignupComponent.js';
import ContainerStyle from '../styles/container.js';

const AuthScreen = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleScreen = () => {
    setShowLogin(!showLogin);
  };

  return (
    <View style={ContainerStyle.container}>
      {showLogin ? (
        <LoginComponent toggleScreen={toggleScreen} navigation={navigation} />
      ) : (
        <SignupComponent toggleScreen={toggleScreen} navigation={navigation} />
      )}
    </View>
  );
};

export default AuthScreen;
