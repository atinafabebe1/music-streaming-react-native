import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';
import InputStyle from '../styles/input';
import ButtonStyle from '../styles/button';

const LoginComponent = ({ toggleScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-backend-url/api/auth/login', {
        username: 'your-username',
        password: 'your-password'
      });

      const { token } = response.data;

      // Store the token securely on the client-side
      await AsyncStorage.setItem('token', token);

      // Update the app's state or navigate to the authenticated screen
      // ...
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
