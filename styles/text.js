import { StyleSheet } from 'react-native';

const TextStyle = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  text: {
    fontSize: 16,
    color: '#333'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    textTransform: 'uppercase'
  },
  description: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    color: '#666'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    textTransform: 'uppercase'
  }
});

export default TextStyle;
