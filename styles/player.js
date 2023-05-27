import { StyleSheet } from 'react-native';

const PlayerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12
  },
  playerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ccc',
    marginBottom: 8
  }
});

export default PlayerStyle;
