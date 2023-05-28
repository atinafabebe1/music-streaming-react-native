import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

const AddMusicScreen = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('');
  const [songFile, setSongFile] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant permission to access media library.');
    }
  };
  const handleAddMusic = async () => {
    try {
      if (!title || !artist || !album || !duration || !genre || !songFile) {
        Alert.alert('Error', 'Please fill in all fields and select a song file.');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('album', album);
      formData.append('duration', duration);
      formData.append('genre', genre);
      formData.append('songFile', {
        uri: songFile.uri,
        name: 'song.mp3', // You can set a custom file name here
        type: 'audio/mp3' // Adjust the MIME type according to your file type
      });
      console.log(songFile);

      // ...
    } catch (error) {
      console.error('Failed to add music', error);
      Alert.alert('Error', `Failed to add music. ${error}`);
    }
  };
  const handleChooseSongFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg', // Adjust the MIME type to match the audio file types you want to select
        copyToCacheDirectory: false
      });

      if (result.type === 'success') {
        const fileUri = result.uri;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        setSongFile({ uri: fileInfo.uri });
      }
    } catch (error) {
      if (error.code === 'cancelled') {
        // User canceled the file selection
        return;
      }

      console.error('Failed to choose song file', error);
      Alert.alert('Error', 'Failed to choose song file. Please try again later.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Artist" value={artist} onChangeText={setArtist} />
      <TextInput placeholder="Album" value={album} onChangeText={setAlbum} />
      <TextInput placeholder="Duration" value={duration} onChangeText={setDuration} />
      <TextInput placeholder="Genre" value={genre} onChangeText={setGenre} />
      <Button title="Choose Song File" onPress={handleChooseSongFile} />
      <Button title="Add Music" onPress={handleAddMusic} />
    </View>
  );
};

export default AddMusicScreen;
