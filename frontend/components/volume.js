import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VolumeSlider = ({ value, onChange }) => {
  const handlePanResponderMove = (e, gestureState) => {
    const width = 200; // Set the width of your slider container
    const offsetX = gestureState.dx;
    const percentage = offsetX / width;
    onChange(percentage);
  };

  return (
    <View style={styles.volumeContainer}>
      <TouchableOpacity style={styles.volumeButton} onPress={() => onChange(value - 0.1)}>
        <Ionicons name="volume-low" size={24} color="#555" />
      </TouchableOpacity>
      <View
        style={styles.volumeSliderContainer}
        {...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            elevation: 3
          },
          android: {
            elevation: 3
          }
        })}
      >
        <View style={[styles.volumeSlider, { width: `${value * 100}%` }]} />
      </View>
      <TouchableOpacity style={styles.volumeButton} onPress={() => onChange(value + 0.1)}>
        <Ionicons name="volume-high" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  coverImage: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  playButton: {
    marginRight: 20
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  volumeButton: {
    paddingHorizontal: 10
  },
  volumeSliderContainer: {
    backgroundColor: '#ddd',
    height: 10,
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 5
  },
  volumeSlider: {
    height: '100%',
    backgroundColor: '#6a1b9a',
    borderRadius: 5
  },
  muteButton: {
    paddingHorizontal: 10
  },
  progressContainer: {
    width: '80%'
  },
  progressView: {
    marginBottom: 10
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  slider: {
    flex: 1
  }
});

export default VolumeSlider;
