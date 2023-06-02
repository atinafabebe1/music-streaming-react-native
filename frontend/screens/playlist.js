import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ContainerStyle from '../styles/container';
import TextStyle from '../styles/text';

const PlaylistScreen = () => {
  const playlistData = [
    { id: '1', title: 'Song 1', artist: 'Artist 1' },
    { id: '2', title: 'Song 2', artist: 'Artist 2' },
    { id: '3', title: 'Song 3', artist: 'Artist 3' }
  ];

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={TextStyle.title}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={ContainerStyle.container}>
      <FlatList data={playlistData} renderItem={renderPlaylistItem} keyExtractor={(item) => item.id} style={styles.playlist} />
    </View>
  );
};

const styles = StyleSheet.create({
  playlist: {
    flex: 1
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 16
  },
  artist: {
    fontSize: 14,
    color: '#888888'
  }
});

export default PlaylistScreen;
