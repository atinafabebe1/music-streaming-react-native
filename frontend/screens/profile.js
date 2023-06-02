import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';

const ProfileScreen = () => {
  //fetch a user information saved in the context
  // const user = useAuth();
  return (
    <View style={ContainerStyle.container}>
      <Text style={TextStyle.heading}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text>Name: John Doe</Text>
        <Text>Email: johndoe@example.com</Text>
        {/* Add more profile information */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8
  }
});

export default ProfileScreen;
