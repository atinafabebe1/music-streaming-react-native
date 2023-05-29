import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';

const SettingsScreen = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled(!isNotificationEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={isNotificationEnabled} onValueChange={toggleNotification} />
      </View>
      {/* Add more settings here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  settingText: {
    fontSize: 18
  }
});

export default SettingsScreen;
