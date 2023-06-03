import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(token !== null); // Update isLoggedIn based on token existence
    } catch (error) {
      console.log('Error reading token from AsyncStorage:', error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Error storing token in AsyncStorage:', error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error removing token from AsyncStorage:', error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};
