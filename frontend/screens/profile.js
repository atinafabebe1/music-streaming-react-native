import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileModal = ({ closeModal, navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, [closeModal]);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        getUserInfo(token);
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.log('Error reading token from AsyncStorage:', error);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await axios.post('https://musicify-0umh.onrender.com/api/users/getme', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.status === 200) {
        setUserInfo(response.data);
      } else {
        console.log('Failed to fetch user information:', response.status);
      }
    } catch (error) {
      console.log(error);
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
      setUserInfo(null);
    } catch (error) {
      console.log('Error removing token from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeading}>Profile</Text>
        {userInfo && (
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>Email: {userInfo.email}</Text>
          </View>
        )}
        {isLoggedIn ? (
          <Button title="Logout" onPress={handleLogout} color="#FF0000" />
        ) : (
          <View>
            <Button title="Login" onPress={handleLoginClicked} color="#1E90FF" />
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
