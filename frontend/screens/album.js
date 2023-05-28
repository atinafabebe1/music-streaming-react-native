import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextStyle from '../styles/text';

const AlbumScreen = ({ navigation }) => {
  const album = {
    title: 'Example Album',
    artist: 'Artist Name',
    coverImage: require('../assets/splash.png'),
    songs: [
      { title: 'Song 1', duration: '3:45' },
      { title: 'Song 2', duration: '4:15' },
      { title: 'Song 3', duration: '3:30' }
      // Add more songs here
    ]
  };

  const handleSongPress = (song) => {
    navigation.navigate('Player', { song });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={album.coverImage} style={styles.coverImage} />
        <Text style={TextStyle.title}>{album.title}</Text>
        <Text style={styles.artist}>{album.artist}</Text>
      </View>
      <View style={styles.songsContainer}>
        {album.songs.map((song, index) => (
          <TouchableOpacity key={index} style={styles.songItem} onPress={() => handleSongPress({ title: 'Song Title', artist: 'Artist Name' })}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.songDuration}>{song.duration}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  header: {
    alignItems: 'center',
    marginBottom: 16
  },
  coverImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8
  },
  artist: {
    fontSize: 16,
    color: '#888'
  },
  songsContainer: {
    flex: 1
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  songDuration: {
    fontSize: 14,
    color: '#888'
  }
});

export default AlbumScreen;
