import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AuthProvider } from './context/authContext';
import SplashScreen from './screens/splash';
import HomeScreen from './screens/home';
import AuthScreen from './screens/auth';
import AboutScreen from './screens/about';
import AlbumScreen from './screens/album';
import FavoritesScreen from './screens/favorites';
import PlayerScreen from './screens/player';
import NotificationScreen from './screens/notification';
import PlaylistScreen from './screens/playlist';
import ProfileScreen from './screens/profile';
import SettingScreen from './screens/settings';
import AddMusicScreen from './screens/addmusic';
import ExistingAlbumsScreen from './screens/existingAlbum';
import AddAlbumScreen from './screens/addAlbum';

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
        title: 'Musicify' // Set custom header title
      }}
    />
    <Stack.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        title: 'Notification'
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
      name="ExistingAlbumScreen"
      component={ExistingAlbumsScreen}
      options={{
        title: 'Albums'
      }}
    />
    <Stack.Screen
      name="AddAlbumScreen"
      component={AddAlbumScreen}
      options={{
        title: 'Add Albums'
      }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile'
      }}
    />
    <Stack.Screen
      name="Auth"
      component={(props) => <AuthScreen {...props} />}
      options={{
        title: 'Auth'
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

const PlaylistsStack = () => (
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
      name="Playlist"
      component={PlaylistScreen}
      options={{
        title: 'My Playlist'
      }}
    />
  </Stack.Navigator>
);
const SettingsStack = () => (
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
      name="Settings"
      component={SettingScreen}
      options={{
        title: 'Settings'
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
    <AuthProvider>
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
                } else if (route.name === 'FavoritesStack') {
                  iconName = 'heart';
                } else if (route.name === 'AboutStack') {
                  iconName = 'information-circle';
                } else if (route.name === 'SettingStack') {
                  iconName = 'settings';
                } else if (route.name === 'PlaylistsStack') {
                  return <MaterialIcons name="playlist-add" size={30} color={color} />;
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarLabel: () => null // Hides the tab bar labels
            })}
          >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="PlaylistsStack" component={PlaylistsStack} options={{ headerShown: false }} />
            <Tab.Screen name="FavoritesStack" component={FavoritesStack} options={{ headerShown: false }} />
            <Tab.Screen name="SettingStack" component={SettingsStack} options={{ headerShown: false }} />
            <Tab.Screen name="AboutStack" component={AboutStack} options={{ headerShown: false }} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
