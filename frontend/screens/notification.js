import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';

const NotificationScreen = () => {
  return (
    <View style={ContainerStyle.container}>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>New album available: "Artist Name - Album Title"</Text>
        <Text style={styles.notificationTime}>10 minutes ago</Text>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Your playlist has been updated</Text>
        <Text style={styles.notificationTime}>1 hour ago</Text>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Upcoming concert in your area: "Artist Name - Concert Venue"</Text>
        <Text style={styles.notificationTime}>2 days ago</Text>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>New feature: Create and share playlists with friends</Text>
        <Text style={styles.notificationTime}>1 week ago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  notificationTime: {
    fontSize: 12,
    color: '#777'
  }
});

export default NotificationScreen;
