import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileModal = ({ closeModal, navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, [closeModal]);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Error reading token from AsyncStorage:', error);
    }
  };

  const handleLoginClicked = () => {
    closeModal();
    navigation.navigate('Auth');
  };

  const handleLogout = async () => {
    try {
      // Perform logout logic and clear the token from AsyncStorage
      await AsyncStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error removing token from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeading}>Profile</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.profileText}>Name: John Doe</Text>
          <Text style={styles.profileText}>Email: johndoe@example.com</Text>
          {/* Add more profile information */}
        </View>
        {isLoggedIn ? (
          <Button title="Logout" onPress={handleLogout} color="#FF0000" />
        ) : (
          <View>
            <Button title="Login" onPress={() => handleLoginClicked()} color="#1E90FF" />
          </View>
        )}
        <Button title="Close" onPress={closeModal} color="#808080" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center'
  },
  profileInfo: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16
  },
  profileText: {
    fontSize: 16,
    marginBottom: 8
  }
});

export default ProfileModal;
