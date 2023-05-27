import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.content}>
        <Image source={require('../assets/musicify.png')} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={[TextStyle.heading, styles.appName]}>Musicify</Text>
          <Text style={[TextStyle.text, styles.descriptionText]}>The Ultimate Music Streaming Experience</Text>
        </View>
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
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0d47a1',
    opacity: 0.8
  },
  content: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  descriptionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontStyle: 'italic'
  }
});

export default SplashScreen;
