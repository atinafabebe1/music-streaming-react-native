import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ProgressViewIOS, Platform, Slider } from 'react-native';
import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const PlayerScreen = ({ route }) => {
  const { song } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = async () => {
    try {
      if (soundObject) {
        const status = await soundObject.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await soundObject.pauseAsync();
          } else {
            await soundObject.playAsync();
          }
          setIsPlaying(!status.isPlaying);
        } else {
          console.log('Sound is not loaded yet');
        }
      } else {
        console.log('Sound object is null');
      }
    } catch (error) {
      console.log('Error occurred while playing/pausing audio:', error);
    }
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleSliderRelease = async () => {
    try {
      if (soundObject) {
        const status = await soundObject.getStatusAsync();
        if (status.isLoaded) {
          const positionMillis = status.durationMillis * sliderValue;
          await soundObject.setPositionAsync(positionMillis);
        } else {
          console.log('Sound is not loaded yet');
        }
      } else {
        console.log('Sound object is null');
      }
    } catch (error) {
      console.log('Error occurred while moving audio:', error);
    }
  };

  const loadAudio = async () => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(
        { uri: 'http://musicify-0umh.onrender.com/api/songs/songs/6474af412b2e960034162228/audio' },
        { shouldPlay: false },
        false
      );
      soundObject.setVolumeAsync(volume); // Set initial volume
      setSoundObject(soundObject);
      console.log('Audio loaded successfully');
    } catch (error) {
      console.log('Error occurred while loading audio:', error);
    }
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (soundObject) {
      soundObject.setVolumeAsync(value);
    }
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (soundObject) {
      soundObject.setIsMutedAsync(newMuteState);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isPlaying) {
      setIsPlaying(false);
    }
    if (status.isLoaded && status.isPlaying) {
      setProgress(status.positionMillis / status.durationMillis);
    }
  };

  useEffect(() => {
    loadAudio();

    return () => {
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
      {Platform.OS === 'ios' && <ProgressViewIOS style={styles.progress} progressTintColor="#6a1b9a" progress={progress} />}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
        onSlidingComplete={handleSliderRelease}
        minimumTrackTintColor="#6a1b9a"
        maximumTrackTintColor="#aaa"
        thumbTintColor="#6a1b9a"
      />
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
      <View style={styles.volumeContainer}>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="#6a1b9a"
          maximumTrackTintColor="#aaa"
          thumbTintColor="#6a1b9a"
        />

        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          <AntDesign name={isMuted ? 'sound' : 'sound'} size={24} color={isMuted ? '#6a1b9a' : '#555'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>Album: {song.album}</Text>
      <Text style={styles.infoText}>Genre: {song.genre}</Text>
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
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#aaa',
    resizeMode: 'cover'
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center'
  },
  artist: {
    fontSize: 18,
    marginBottom: 10,
    color: '#777',
    fontStyle: 'italic'
  },
  progress: {
    width: '80%',
    marginBottom: 10
  },
  slider: {
    width: '80%',
    marginBottom: 10
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  controlButton: {
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3
  },
  playButton: {
    backgroundColor: '#6a1b9a'
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '60%'
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 10
  },
  volumeButton: {
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3
  },
  muteButton: {
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#777',
    fontStyle: 'italic'
  }
});

export default PlayerScreen;
