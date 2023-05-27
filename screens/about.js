import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={ContainerStyle.container}>
        <Image source={require('../assets/musicify.png')} style={styles.logo} />
        <Text style={TextStyle.title}>Music Streaming App</Text>
        <Text style={TextStyle.description}>
          Welcome to our music streaming app. We provide a wide range of music genres and a seamless listening experience. Explore our vast collection
          of songs, create playlists, and enjoy your favorite music anytime, anywhere.
        </Text>
        <Text style={TextStyle.sectionTitle}>Features:</Text>
        <View style={styles.featureContainer}>
          <Text style={styles.feature}>- Explore and discover music from various genres, artists, and albums</Text>
          <Text style={styles.feature}>- Create and manage your personalized playlists</Text>
          <Text style={styles.feature}>- Enjoy high-quality audio streaming</Text>
          <Text style={styles.feature}>- Follow your favorite artists and stay updated with their latest releases</Text>
          <Text style={styles.feature}>- Share your favorite songs and playlists with friends</Text>
        </View>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1
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
    shadowRadius: 2
  },
  featureContainer: {
    width: '100%',
    paddingHorizontal: 32,
    marginBottom: 24
  },
  feature: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'left',
    color: '#666',
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#f4511e'
  },
  version: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 24
  }
});

export default AboutScreen;
