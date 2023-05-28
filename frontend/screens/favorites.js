import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'Song 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    },
    {
      id: '2',
      title: 'Song 2',
      artist: 'Artist 2',
      image: require('../assets/splash.png')
    },
    {
      id: '3',
      title: 'Song 3',
      artist: 'Artist 3',
      image: require('../assets/splash.png')
    }
    // Add more favorite songs here
  ]);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.favoriteItem}>
      <Image source={item.image} style={styles.songImage} />
      <View style={styles.songDetails}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      <FlatList data={favorites} renderItem={renderFavoriteItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.favoriteList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  favoriteList: {
    paddingBottom: 24
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12
  },
  songDetails: {
    flex: 1
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  songArtist: {
    fontSize: 14,
    color: '#666'
  }
});

export default FavoritesScreen;
