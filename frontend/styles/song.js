import { StyleSheet } from 'react-native';

const SongStyle = StyleSheet.create({
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

export default SongStyle;
