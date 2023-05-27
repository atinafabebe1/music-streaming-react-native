import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const HeaderMenu = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerLink}>
        <Text style={styles.headerLinkText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.headerLink}>
        <Text style={styles.headerLinkText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.headerLink}>
        <Text style={styles.headerLinkText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f0f0f0'
  },
  headerLink: {
    paddingHorizontal: 10
  },
  headerLinkText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default HeaderMenu;
