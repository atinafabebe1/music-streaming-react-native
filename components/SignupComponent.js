import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';
import InputStyle from '../styles/input';
import ButtonStyle from '../styles/button';

const SignupComponent = ({ toggleScreen }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Perform registration logic here
    console.log('Sign up clicked');
  };

  return (
    <View style={ContainerStyle.container}>
      <Text style={TextStyle.heading}>Sign up</Text>
      <TextInput style={InputStyle.input} placeholder="Name" onChangeText={(text) => setName(text)} value={name} />
      <TextInput style={InputStyle.input} placeholder="Username" onChangeText={(text) => setUsername(text)} value={username} />
      <TextInput
        style={InputStyle.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput style={InputStyle.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} value={password} />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={ButtonStyle.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switchButton} onPress={toggleScreen}>
        <Text style={styles.switchButtonText}>Already have an account? Login</Text>
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

export default SignupComponent;
