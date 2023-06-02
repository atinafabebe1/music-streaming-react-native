import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextStyle from '../styles/text';
import ContainerStyle from '../styles/container';
import SongStyle from '../styles/song';

const AlbumScreen = ({ navigation, route }) => {
  const { album } = route.params;
  const handleSongPress = (song) => {
    navigation.navigate('Player', { song });
  };

  return (
    <View style={ContainerStyle.container}>
      <View style={styles.header}>
        <Image source={album.coverImage} style={styles.coverImage} />
        <Text style={TextStyle.title}>{album.title}</Text>
        <Text style={styles.artist}>{album.artist}</Text>
      </View>
      <View style={SongStyle.songsContainer}>
        {album.songs.map((song, index) => (
          <TouchableOpacity key={index} style={SongStyle.songItem} onPress={() => handleSongPress({ title: 'Song Title', artist: 'Artist Name' })}>
            <Text style={SongStyle.songTitle}>{song.title}</Text>
            <Text style={SongStyle.songDuration}>{song.duration}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default AlbumScreen;
