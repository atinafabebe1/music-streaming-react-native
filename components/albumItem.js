import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AlbumItem = ({ album, handleAlbumPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.albumContainer} onPress={() => handleAlbumPress(album)}>
      <View style={styles.albumImageContainer}>
        <Image source={album.image} style={styles.albumImage} />
      </View>
      <Text style={styles.albumTitle}>{album.title}</Text>
      <Text style={styles.albumArtist}>{album.artist}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  albumImageContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  albumImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover'
  },
  albumTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 8
  },
  albumArtist: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 8,
    paddingBottom: 8
  }
});

export default AlbumItem;
