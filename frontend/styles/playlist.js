import { StyleSheet } from 'react-native';

const PlaylistStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  playlistItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12
  },
  playlistItemText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default PlaylistStyle;
