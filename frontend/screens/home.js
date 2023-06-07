import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AlbumItem from '../components/albumItem';
import axios from 'axios';
import ProfileModal from './profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchAlbums();
    checkLoginStatus();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://musicify-0umh.onrender.com/api/songs/songs');
      setAlbums(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleSearch = (query) => {
    // Make this fetch data from the server by a field the user queried
  };

  const handleAlbumPress = (album) => {
    navigation.navigate('Album', { album });
  };

  const renderAlbum = ({ item }) => <AlbumItem album={item} handleAlbumPress={handleAlbumPress} />;

  const handleAddMusic = () => {
    navigation.navigate('ExistingAlbumScreen');
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token');
      console.log(token);
    } catch (error) {
      console.log('Error reading token from AsyncStorage:', error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" value={searchQuery} onChangeText={handleSearch} placeholderTextColor="#999" />
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
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
      {isLoggedIn && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddMusic}>
          <MaterialIcons name="add" size={35} color="#fff" />
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <ProfileModal closeModal={toggleModal} navigation={navigation} />
      </Modal>
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
