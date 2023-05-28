import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Foundation } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const PlayerScreen = ({ route }) => {
  const { song } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObject, setSoundObject] = useState(null);

  const handlePlayPause = async () => {
    try {
      if (soundObject && soundObject.isLoaded) {
        if (isPlaying) {
          await soundObject.pauseAsync();
        } else {
          await soundObject.playAsync();
        }
        setIsPlaying(!isPlaying);
      } else {
        console.log('Sound is not loaded yet');
      }
    } catch (error) {
      console.log('Error occurred while playing/pausing audio:', error);
    }
  };
  const loadAudio = async () => {
    try {
      const response = await fetch('https://musicify-0umh.onrender.com/api/songs/songs/64739b5fb3584b2ca0e8a8b1');
      console.log(response);
      const soundObject = new Audio.Sound();

      await soundObject.loadAsync({ uri: `${response.url}/audio` }, { shouldPlay: false });

      setSoundObject(soundObject);
      console.log('Audio loaded successfully');
    } catch (error) {
      console.log('Error occurred while loading audio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isPlaying) {
      setIsPlaying(false);
    }
  };

  // Call the loadAudio function when the component mounts
  useEffect(() => {
    loadAudio();

    return () => {
      // Clean up resources when the component unmounts
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/cover.jpg')} style={styles.coverImage} />
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Foundation name="previous" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.playButton]} onPress={handlePlayPause}>
          <AntDesign name={isPlaying ? 'pause' : 'play'} size={24} color="#fff" />
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
