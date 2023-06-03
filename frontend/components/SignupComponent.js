import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import LoginComponent from './loginComponent';

const SignupComponent = ({ toggleScreen, navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentScreen, setCurrentScreen] = useState('signup');

  const handleSignup = async () => {
    setError('');
    try {
      const response = await axios.post('https://musicify-0umh.onrender.com/api/users/register', {
        username: username,
        password: password,
        email: email
      });
      setSignupSuccess(true);
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response) {
        setError('Error during signup: ' + error.response.data.message);
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else {
        setError('Error during signup. Please try again later.');
      }
    }
  };

  if (signupSuccess) {
    return <LoginComponent toggleScreen={toggleScreen} navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign up</Text>
      <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => setUsername(text)} value={username} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} value={password} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switchButton} onPress={toggleScreen}>
        <Text style={styles.switchButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  switchButton: {
    marginTop: 12
  },
  switchButtonText: {
    color: '#f4511e',
    fontSize: 16,
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center'
  }
});

export default SignupComponent;
