import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text>Name: John Doe</Text>
        <Text>Email: johndoe@example.com</Text>
        {/* Add more profile information */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  profileInfo: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8
  }
});

export default ProfileScreen;
