import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';

const SettingsScreen = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled(!isNotificationEnabled);
  };

  return (
    <View style={ContainerStyle.container}>
      <View style={styles.settingItem}>
        <Text style={TextStyle.text}>Enable Notifications</Text>
        <Switch value={isNotificationEnabled} onValueChange={toggleNotification} />
      </View>
      {/* Add more settings here */}
    </View>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  }
});

export default SettingsScreen;
