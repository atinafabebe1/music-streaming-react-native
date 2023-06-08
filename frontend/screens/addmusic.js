import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

import { TouchableOpacity } from 'react-native-gesture-handler';

import ButtonStyle from '../styles/button';
import ContainerStyle from '../styles/container';
import InputStyle from '../styles/input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMusicScreen = ({ route }) => {
  const { album } = route.params;
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant permission to access the media library.');
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleAddMusic = async () => {
    try {
      if (!title || !artist || !duration || !genre || !songFile) {
        Alert.alert('Error', 'Please fill in all fields and select a song file.');
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('album', album._id);
      formData.append('duration', duration);
      formData.append('genre', genre);
      formData.append('songFile', {
        uri: songFile.uri,
        name: 'song.mp3',
        type: 'audio/mp3'
      });

      const token = await AsyncStorage.getItem('token');

      const response = await axios.post('https://musicify-0umh.onrender.com/api/songs/songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setTitle('');
      setArtist('');
      setDuration('');
      setGenre('');
      setSongFile(null);

      setIsLoading(false);

      Alert.alert('Success', 'Music added successfully.');
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        console.error('Axios Error:', error.response);
        Alert.alert('Error', `Failed to add music. ${error.message}`);
      } else {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleChooseSongFile = async () => {
    try {
      const { status } = await MediaLibrary.getPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant permission to access the media library.');
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg',
        copyToCacheDirectory: false
      });

      if (result.type === 'success') {
        const fileUri = result.uri;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        setSongFile({ uri: fileInfo.uri });
      }
    } catch (error) {
      if (error.code === 'cancelled') {
        return;
      }

      console.error('Failed to choose song file', error);
      Alert.alert('Error', 'Failed to choose the song file. Please try again later.');
    }
  };

  return (
    <View style={ContainerStyle.container}>
      <TextInput style={InputStyle.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={InputStyle.input} placeholder="Artist" value={artist} onChangeText={setArtist} />
      <TextInput style={InputStyle.input} placeholder="Duration" value={duration} onChangeText={setDuration} />
      <TextInput style={InputStyle.input} placeholder="Genre" value={genre} onChangeText={setGenre} />

      <TouchableOpacity style={styles.button} onPress={handleChooseSongFile} disabled={isLoading}>
        <Text>Choose Song File</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ButtonStyle.button} disabled={isLoading} onPress={handleAddMusic}>
        <Text style={ButtonStyle.buttonText}>Add Music</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12
  },
  loadingIndicator: {
    marginTop: 16
  }
});

export default AddMusicScreen;
