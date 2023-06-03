import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const ProfileModal = ({ closeModal, navigation }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, [closeModal]);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        getUserInfo(token);
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      console.log('Error reading token from AsyncStorage:', error);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await axios.post('https://musicify-0umh.onrender.com/api/users/getme', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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
    await logout();
    setUserInfo(null);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeading}>Profile</Text>
        {userInfo && (
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>Email: {userInfo.email}</Text>
            <Text style={styles.profileText}>Username: {userInfo.username}</Text>
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
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  },
  profileText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555'
  }
});

export default ProfileModal;
