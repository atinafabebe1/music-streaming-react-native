import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Dimensions } from 'react-native';
import AlbumItem from '../components/albumItem';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  const albums = [
    {
      id: '1',
      title: 'Album 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    },
    {
      id: '5',
      title: 'Album 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    },
    {
      id: '2',
      title: 'Album 2',
      artist: 'Artist 2',
      image: require('../assets/splash.png')
    },
    {
      id: '3',
      title: 'Album 3',
      artist: 'Artist 3',
      image: require('../assets/splash.png')
    },
    {
      id: '4',
      title: 'Album 3',
      artist: 'Artist 3',
      image: require('../assets/splash.png')
    }
    // Add more album data here
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredAlbums = albums.filter(
      (album) => album.title.toLowerCase().includes(query.toLowerCase()) || album.artist.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredAlbums(filteredAlbums);
  };
  const handleAlbumPress = (album) => {
    navigation.replace('Album', { album });
  };

  const renderAlbum = ({ item }) => <AlbumItem album={item} handleAlbumPress={handleAlbumPress} />;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" value={searchQuery} onChangeText={handleSearch} placeholderTextColor="#999" />
      </View>
      <Text style={styles.heading}>New Releases</Text>
      <FlatList
        data={searchQuery ? filteredAlbums : albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.albumList}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const albumItemWidth = (windowWidth - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  searchContainer: {
    marginBottom: 16
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  albumList: {
    justifyContent: 'space-between'
  },
  albumItem: {
    width: albumItemWidth,
    marginBottom: 16
  }
});

export default HomeScreen;
