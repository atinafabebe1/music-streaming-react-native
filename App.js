import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from './screens/splash';
import HomeScreen from './screens/home';
import AuthScreen from './screens/auth';
import AboutScreen from './screens/about';
import AlbumScreen from './screens/album';
import FavoritesScreen from './screens/favorites';
import PlayerScreen from './screens/player';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS, // Add fancy slide animation
      headerStyle: {
        backgroundColor: '#007bff' // Customize header background color
      },
      headerTintColor: '#fff', // Customize header text color
      headerTitleStyle: {
        fontWeight: 'bold' // Customize header title style
      }
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home' // Set custom header title
      }}
    />
    <Stack.Screen
      name="Album"
      component={AlbumScreen}
      options={{
        title: 'Album'
      }}
    />
    <Stack.Screen
      name="Player"
      component={PlayerScreen}
      options={{
        title: 'Player'
      }}
    />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      headerStyle: {
        backgroundColor: '#007bff'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        title: 'Favorites'
      }}
    />
  </Stack.Navigator>
);

const AboutStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      headerStyle: {
        backgroundColor: '#007bff'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <Stack.Screen
      name="About"
      component={AboutScreen}
      options={{
        title: 'About'
      }}
    />
  </Stack.Navigator>
);
export default function App() {
  const [isAppReady, setAppReady] = React.useState(false);

  useEffect(() => {
    // Simulating an asynchronous task (e.g., fetching data, loading assets)
    // Replace this with your actual logic
    setTimeout(() => {
      setAppReady(true);
    }, 2000);
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeStack"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'HomeStack') {
                iconName = 'home';
              } else if (route.name === 'Favorites') {
                iconName = 'heart';
              } else if (route.name === 'About') {
                iconName = 'information-circle';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabel: () => null // Hides the tab bar labels
          })}
          tabBarOptions={{
            activeTintColor: '#007bff', // Customize active tab icon color
            inactiveTintColor: 'gray' // Customize inactive tab icon color
          }}
        >
          <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Favorites" component={FavoritesStack} options={{ headerShown: false }} />
          <Tab.Screen name="About" component={AboutStack} options={{ headerShown: false }} />
        </Tab.Navigator>
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
