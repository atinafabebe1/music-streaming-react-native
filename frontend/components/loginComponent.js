import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';
import InputStyle from '../styles/input';
import ButtonStyle from '../styles/button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext';

const LoginComponent = ({ toggleScreen, navigation }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://musicify-0umh.onrender.com/api/users/login', {
        username: username,
        password: password
      });

      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      await login(token);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error response
      // ...
    }
  };

  return (
    <View style={ContainerStyle.container}>
      <Text style={TextStyle.heading}>Login</Text>
      <TextInput
        style={InputStyle.input}
        placeholder="username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
        keyboardType="username"
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
    width: '90%',
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
