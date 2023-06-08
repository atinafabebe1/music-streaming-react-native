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
      setAlbums(response.data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    }
  };

  const navigateToAddSong = (album) => {
    navigation.navigate('AddNewMusic', { album });
  };

  const renderItem = ({ item }) => {
    const coverImageSource = item.coverImage ? { uri: `data:image/png;base64,${item.coverImage}` } : null;

    return (
      <TouchableOpacity style={styles.albumItem} onPress={() => navigateToAddSong(item)}>
        {coverImageSource && <Image style={styles.albumImage} source={coverImageSource} resizeMode="cover" />}
        <View style={styles.albumInfo}>
          <Text style={styles.albumName}>{item.title}</Text>
          <Text style={styles.artistName}>{item.artist}</Text>
        </View>
        <Text style={styles.addSongLink}>Add Song</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {albums.length > 0 ? (
        <FlatList data={albums} renderItem={renderItem} keyExtractor={(item) => item._id} />
      ) : (
        <Text style={styles.noAlbumsText}>No albums found.</Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAlbumScreen')}>
        <Text style={styles.addButtonLabel}>Add New Album</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  albumImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 4
  },
  albumInfo: {
    flex: 1
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  artistName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  addSongLink: {
    color: '#2979FF',
    textDecorationLine: 'underline',
    fontSize: 14
  },
  noAlbumsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16
  },
  addButton: {
    backgroundColor: '#2979FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 24
  },
  addButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF'
  }
});

export default ExistingAlbumsScreen;
