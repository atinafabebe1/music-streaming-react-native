import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import ContainerStyle from '../styles/container';
import ButtonStyle from '../styles/button';

const ExistingAlbumsScreen = () => {
  const navigation = useNavigation();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://musicify-0umh.onrender.com/api/albums');
      console.log(response.data);
      setAlbums(response.data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    }
  };

  const navigateToAddSong = (album) => {
    navigation.navigate('Addnewmusic', { album });
  };

  function convertBase64ToImage(base64String) {
    const image = new Image();
    image.src = 'data:image/png;base64,' + base64String;
    return image;
  }

  const renderItem = ({ item }) => {
    const convertedImage = item.coverImage ? convertBase64ToImage(item.coverImage) : null;

    return (
      <TouchableOpacity style={styles.albumItem} onPress={() => navigateToAddSong(item)}>
        {convertedImage && <Image style={styles.albumImage} source={{ uri: convertedImage.src }} resizeMode="cover" />}
        <View style={styles.albumInfo}>
          <Text style={styles.albumName}>{item.title}</Text>
          <Text style={styles.artistName}>{item.artist}</Text>
        </View>
        <Text style={styles.addSongLink}>Add Song</Text>
      </TouchableOpacity>
    );
  };

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
  albumImage: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  albumInfo: {
    flex: 1
  },
  albumName: {
    fontSize: 16
  },
  artistName: {
    fontSize: 14,
    color: '#888'
  },
  addSongLink: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});

export default ExistingAlbumsScreen;
