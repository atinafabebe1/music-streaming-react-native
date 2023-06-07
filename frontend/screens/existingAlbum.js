import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

import ContainerStyle from '../styles/container';
import ButtonStyle from '../styles/button';

const ExistingAlbumsScreen = () => {
  const navigation = useNavigation(); // Initialize navigation hook

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://musicify-0umh.onrender.com/api/albums/');
      console.log(response.data);
      setAlbums(response.data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    }
  };

  const navigateToAddSong = (album) => {
    navigation.navigate('Addnewmusic', { album }); // Replace 'AddSongForm' with the actual screen name for the add song form
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.albumItem} onPress={() => navigateToAddSong(item)}>
      <Text style={styles.albumName}>{item.title}</Text>
      <Text style={styles.addSongLink}>Add Song</Text>
    </TouchableOpacity>
  );

  return (
    <View style={ContainerStyle.container}>
      <Text style={styles.title}>Existing Albums</Text>

      {albums.length > 0 ? <FlatList data={albums} renderItem={renderItem} keyExtractor={(item) => item._id} /> : <Text>No albums found.</Text>}

      <TouchableOpacity style={ButtonStyle.button} onPress={() => navigation.navigate('AddAlbumScreen')}>
        <Text style={ButtonStyle.buttonText}>Add New Album</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  albumItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  albumName: {
    fontSize: 16
  },
  addSongLink: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});

export default ExistingAlbumsScreen;
