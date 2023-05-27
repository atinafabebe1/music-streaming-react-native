import { StyleSheet } from 'react-native';

const SearchStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  searchResultItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12
  },
  searchResultItemText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default SearchStyle;
