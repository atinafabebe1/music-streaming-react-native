import React from 'react';
import { View, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';

const NotificationScreen = () => {
  const notifications = [
    { id: 1, message: 'New song added to your playlist' },
    { id: 2, message: 'You have a new follower' },
    { id: 3, message: 'Your playlist reached 1000 plays' }
    // Add more notifications as needed
  ];

  return (
    <View>
      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        {notifications.map((notification) => (
          <View key={notification.id}>
            <List.Item title={notification.message} />
            <Divider />
          </View>
        ))}
      </List.Section>
    </View>
  );
};

export default NotificationScreen;
