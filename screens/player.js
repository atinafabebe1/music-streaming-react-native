import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Foundation } from '@expo/vector-icons';

const PlayerScreen = ({ route }) => {
  const { song } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require('../assets/cover.jpg')} style={styles.coverImage} />
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Foundation name="previous" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.playButton]}>
          <AntDesign name="play" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Foundation name="next" size={24} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7'
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  artist: {
    fontSize: 18,
    marginBottom: 20,
    color: '#777'
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controlButton: {
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0'
  },
  playButton: {
    backgroundColor: '#6a1b9a'
  }
});

export default PlayerScreen;
