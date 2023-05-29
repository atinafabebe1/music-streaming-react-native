import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
      id: '2',
      title: 'Album 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    },
    {
      id: '3',
      title: 'Album 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    },
    {
      id: '4',
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
      id: '6',
      title: 'Album 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    },
    {
      id: '7',
      title: 'Album 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    },
    {
      id: '8',
      title: 'Album 1',
      artist: 'Artist 1',
      image: require('../assets/splash.png')
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredAlbums = albums.filter(
      (album) => album.title.toLowerCase().includes(query.toLowerCase()) || album.artist.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredAlbums(filteredAlbums);
  };

  const handleAlbumPress = (album) => {
    navigation.navigate('Album', { album });
  };

  const renderAlbum = ({ item }) => <AlbumItem album={item} handleAlbumPress={handleAlbumPress} />;

  const handleAddMusic = () => {
    navigation.navigate('AddNewMusic');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" value={searchQuery} onChangeText={handleSearch} placeholderTextColor="#999" />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <MaterialIcons name="account-circle" size={35} color="purple" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>New Releases</Text>
      <FlatList
        data={searchQuery ? filteredAlbums : albums}
        renderItem={renderAlbum}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.albumList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddMusic}>
        <MaterialIcons name="add" size={35} color="#fff" />
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    color: '#333',
    marginRight: 8
  },
  icon: {
    marginRight: 8
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
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'purple',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
