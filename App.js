import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/splash';
import HomeScreen from './screens/home';
import AuthScreen from './screens/auth';
import AboutScreen from './screens/about';
import AlbumScreen from './screens/album';
import FavoritesScreen from './screens/favorites';
import PlayerScreen from './screens/player';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Album" component={AlbumScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Player" component={PlayerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
