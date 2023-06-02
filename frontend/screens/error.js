import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';

const ErrorScreen = ({ error, onRetry }) => {
  return (
    <View style={ContainerStyle.container}>
      <Text style={TextStyle.heading}>Oops, something went wrong!</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ErrorScreen;
