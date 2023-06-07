import React, { useState } from 'react';
import { View, TextInput, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; // Import the ImagePicker module

import ButtonStyle from '../styles/button';
import ContainerStyle from '../styles/container';
import InputStyle from '../styles/input';

const AddAlbumScreen = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null); // Store the selected cover image URI

  const handleAddMusic = async () => {
    try {
      if (!title || !description || !genre) {
        Alert.alert('Error', 'Please fill in all fields and select a song file.');
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('genre', genre);
      formData.append('description', description);
      formData.append('coverImage', {
        uri: coverImage,
        name: 'coverImage.jpg',
        type: 'image/jpg'
      }); // Append the cover image to the form data

      const response = await axios.post('https://musicify-0umh.onrender.com/api/albums/album', formData, {});

      setTitle('');
      setGenre('');
      setDescription('');
      setCoverImage(null); // Reset the cover image state
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

  const handleSelectCoverImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to select a cover image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });

      if (!result.cancelled) {
        setCoverImage(result.uri);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred while selecting the cover image.');
    }
  };

  return (
    <View style={ContainerStyle.container}>
      <TextInput style={InputStyle.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={InputStyle.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={InputStyle.input} placeholder="Genre" value={genre} onChangeText={setGenre} />

      <TouchableOpacity style={ButtonStyle.button} disabled={isLoading} onPress={handleSelectCoverImage}>
        <Text style={ButtonStyle.buttonText}>Select Cover Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ButtonStyle.button} disabled={isLoading} onPress={handleAddMusic}>
        <Text style={ButtonStyle.buttonText}>Save Album</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 16
  }
});

export default AddAlbumScreen;
