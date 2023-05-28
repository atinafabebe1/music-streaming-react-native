import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';
import Album from '../screens/album';
import Player from '../screens/player';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  Album: {
    screen: Album,
    navigationOptions: {
      title: 'Album'
    }
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default HomeStack;
