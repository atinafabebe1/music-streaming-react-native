import { StyleSheet } from 'react-native';

const ButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
    margin: 2
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ButtonStyle;
