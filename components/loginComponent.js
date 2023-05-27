import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';
import InputStyle from '../styles/input';
import ButtonStyle from '../styles/button';

const LoginComponent = ({ toggleScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Login clicked');
  };

  return (
    <View style={ContainerStyle.container}>
      <Text style={TextStyle.heading}>Login</Text>
      <TextInput
        style={InputStyle.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput style={InputStyle.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} value={password} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={ButtonStyle.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switchButton} onPress={toggleScreen}>
        <Text style={styles.switchButtonText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  switchButton: {
    marginTop: 12
  },
  switchButtonText: {
    color: '#f4511e',
    fontSize: 16
  }
});

export default LoginComponent;
